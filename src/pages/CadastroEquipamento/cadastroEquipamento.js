import React, { useState, useRef, useContext } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Backdrop
} from "@material-ui/core"
import { Autocomplete } from '@material-ui/lab'
import MaskedInput from 'react-text-mask'
import { useStyles } from './cadastroEquipamentoStyle';
import nextInput from '../../services/nextInput';
import findError from '../../services/findError';
import api from '../../services/api';
import { format, parseISO, isAfter } from 'date-fns';
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router';
import ModalRedirect from '../../components/ModalRedirect/ModalRedirect';

export default function CadastroEquipamento(props) {
  const history = useHistory();
  const [error, setError] = React.useState({
    cpf_client: "",
    installation_date: ""
  });
  const [models, setModels] = React.useState([{}]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [idCadastrado, setIdCadastrado] = useState();

  const { sendMessage } = useContext(AuthContext);

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    id_model: "",
    equipment_code: "",
    installation_date: format(new Date(), "yyyy-MM-dd"),
    situation: "Ok",
    cpf_client: "",
    observation: "",
    address: "",
    zipcode: "",
  });

  //pegar modelos
  React.useEffect(() => {

    api.get('model/index')
      .then(model => {
        const models = model.data.data;
        setModels(models);
      })
      .catch(error => {
        console.log(error);
        sendMessage(`Error 504: ${error.message}`, 'error')
      });

    setLoading(false)
  }, [sendMessage])

  async function handleSubmit(event) {

    event.preventDefault();

    setError({
      cpf_client: "",
      installation_date: ""
    })

    if (isAfter(parseISO(formData.installation_date), new Date()))
      setError(prev => ({ ...prev, installation_date: "Data inválida!" }))
    else {

      const data = {
        id_model: formData.id_model,
        equipment_code: formData.equipment_code,
        installation_date: formData.installation_date,
        initial_work: formData.installation_date,
        situation: formData.situation,
        // cpf_client: formData.cpf_client,
        address: formData.address,
        zipcode: formData.zipcode,
      }
      console.log("Data: ", data);

      //enviar para o backend
      sendMessage('Realizando cadastro...', 'info', null)
      try {
        const resposta = await api.post('/equipment/create', data);

        console.log(resposta);

        if (resposta.data && resposta.data.id) {
          setIdCadastrado(resposta.data.id);
          sendMessage('Cadastrado com sucesso')
        };
      } catch (err) {
          sendMessage('Error 501: Falha no cadastro', 'error')
          console.warn(err);
      }
          setOpenModal(true);
    }
  }

  function handleChangeInput(event, valueA) {

    let { name, value } = event.target;
    let str = value;

    if (valueA) { // from autocomplete

      setFormData(prev => ({ ...prev, equipment_model: valueA }));
      const selectedModel = models.find(model => model.modelName === valueA);
      setFormData(prev => ({ ...prev, id_model: selectedModel.id }))

    } else {

      if (name === "zipcode") {
        value = str.replace(/[^0-9]/g, ""); // somente numeros e '-'
      }
      setFormData({ ...formData, [name]: value });
    }
      
  }

  // Referencias (próximo a declaração de um ponteiro nulo)
  const equipmentModelRef = useRef(null);
  const idEquipmentRef = useRef(null);
  const instalationDateRef = useRef(null);
  const cpfClientRef = useRef(null);
  const observationRef = useRef(null);
  const addressRef = useRef(null);
  const zipcodeRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "equipment_model", ref: idEquipmentRef },
    { name: "equipment_code", ref: instalationDateRef },
    { name: "installation_date", ref: cpfClientRef },
    { name: "cpf_client", ref: observationRef },
    { name: "observation", ref: addressRef },
    { name: "address", ref: zipcodeRef },
    { name: "zipCode", ref: buttonSubmitRef }
  ];

  const classes = useStyles();

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo equipamento
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit}>

          <div className={classes.containerForm}>
            <Autocomplete
              className={classes.inputs}
              options={models.map(model => model.modelName)}
              onChange={handleChangeInput}
              // value={formData.equipment_model}
              renderInput={params => (
                <TextField
                  name="equipment_model"
                  {...params}
                  label="Modelo do equipamento"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled"
                  required
                  autoComplete="off"
                  autoFocus
                  inputRef={equipmentModelRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)}
                />
              )}
            />

            <TextField
              name="equipment_code"
              className={classes.inputs}
              value={formData.equipment_code}
              onChange={handleChangeInput}
              label="Código do Equipamento"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              required
              autoComplete="off"
              inputRef={idEquipmentRef} // atribui um elemento a ref criada
              onKeyPress={e => nextInput(e, relacionamentosRef)} // manda a tecla apertada para a função analizar
            />

            <TextField
              name="installation_date"
              className={classes.inputs}
              value={formData.installation_date}
              onChange={handleChangeInput}
              label="Data de Instalação"
              type="date"
              helperText={error.installation_date === "" ? "*Obrigatório" : error.installation_date}
              error={error.installation_date !== ""}
              variant="filled"
              autoComplete="off"
              inputRef={instalationDateRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="cpf_client"
              className={classes.inputs}
              value={formData.cpf_client}
              onChange={handleChangeInput}
              label="CPF/CNPJ do cliente"
              type="text"
              helperText={error.cpf_client === "" ? "(Opcional)" : error.cpf_client}
              error={error.cpf_client !== ""}
              variant="filled"
              inputRef={cpfClientRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="observation"
              className={classes.inputs}
              value={formData.observation}
              onChange={handleChangeInput}
              label="Observações"
              type="text"
              helperText="(Opcional)"
              autoComplete="off"
              variant="filled"
              inputRef={observationRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="address"
              className={classes.inputs}
              value={formData.address}
              onChange={handleChangeInput}
              label="Endereço"
              type="text"
              helperText="(Opcional)"
              autoComplete="off"
              variant="filled"
              inputRef={addressRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="zipcode"
              className={classes.inputs}
              value={formData.zipcode}
              onChange={handleChangeInput}
              label="CEP"
              type="text"
              helperText="(Opcional)"
              autoComplete="off"
              variant="filled"
              inputProps={{ maxLength: 8 }}
              inputRef={zipcodeRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <ModalRedirect openModal={openModal} closeModal={() => setOpenModal(false)} linkId={()=> history.push(`/ae/` + idCadastrado)}/>
            <div>
              <Button type="submit"
                ref={buttonSubmitRef} // neste caso o button pode ser acessado 
                // diretamente por isso usamos ref={}
                className={classes.buttonRegister}>
                  Cadastrar
              </Button>
            </div>

          </div>

        </form>
      </div>

    </React.Fragment>
  )
}
