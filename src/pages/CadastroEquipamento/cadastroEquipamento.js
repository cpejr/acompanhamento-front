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

function CPFInput(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
    />
  );
}

export default function CadastroEquipamento(props) {
  const history = useHistory();
  const [error, setError] = React.useState({
    cpf_client: "",
    instalation_date: ""
  });
  const [models, setModels] = React.useState([{}]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const { sendMessage } = useContext(AuthContext);

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    id_model: "",
    id_equipment: "",
    equipment_model: "",
    instalation_date: format(new Date(), "yyyy-MM-dd"),
    situation: "Ok",
    cpf_client: "",
    //opcionais
    observation: "",
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
    event.preventDefault()
    console.debug("FormData: ", formData)
    setError({
      cpf_client: "",
      instalation_date: ""
    })

    // coloque os opcionais por ultimo e para cada um adione um pop()
    let formDataWithoutNotRequired = Object.values(formData);
    // formDataWithoutNotRequired.pop()
    if (formDataWithoutNotRequired.includes("")) {
      sendMessage('Alguns campos estão vazios', 'info')
    }
    else if (!findError("cpf/cnpj", formData.cpf_client))
      setError(prev => ({ ...prev, cpf_client: "CPF/CNPJ inválido!" }))
    else if (isAfter(parseISO(formData.instalation_date), new Date()))
      setError(prev => ({ ...prev, instalation_date: "Data inválida!" }))
    else {
      const data = {
        id_model: formData.id_model,
        id_equipment: formData.id_equipment,
        equipment_model: formData.equipment_model,
        instalation_date: parseISO(formData.instalation_date),
        situation: formData.situation,
        cpf_client: formData.cpf_client,
        observation: formData.observation
      }
      console.debug("Data: ", data)

      //enviar para o backend
      sendMessage('Realizando cadastro...', 'info', null)
      try {
        const resposta = await api.post('/equipment/create', data);

        if (resposta.data && resposta.data.equipment) {
          const equipamento = resposta.data.equipment;
          const id = equipamento.id;

          sendMessage('Cadastrado com sucesso')
          history.push(`/ae/` + id);
        };
      } catch (err) {
          sendMessage('Error 501: Falha no cadastro', 'error')
          console.warn(err);
      }
          setOpenModal(true);
    }
  }

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    if (valueA) {// from autocomplete
      setFormData(prev => ({ ...prev, equipment_model: valueA }));
      const selectedModel = models.find(model => model.modelName === valueA);
      setFormData(prev => ({ ...prev, id_model: selectedModel.id }))
    } else
      setFormData({ ...formData, [name]: value });
  }

  // Referencias (próximo a declaração de um ponteiro nulo)
  const equipmentModelRef = useRef(null);
  const idEquipmentRef = useRef(null);
  const instalationDateRef = useRef(null);
  const cpfClientRef = useRef(null);
  const observationRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "equipment_model", ref: idEquipmentRef },
    { name: "id_equipment", ref: instalationDateRef },
    { name: "instalation_date", ref: cpfClientRef },
    { name: "cpf_client", ref: observationRef },
    { name: "observation", ref: buttonSubmitRef }
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
              name="id_equipment"
              className={classes.inputs}
              value={formData.id_equipment}
              onChange={handleChangeInput}
              label="Número de série"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              required
              autoComplete="off"
              inputRef={idEquipmentRef} // atribui um elemento a ref criada
              onKeyPress={e => nextInput(e, relacionamentosRef)} // manda a tecla apertada para a função analizar
            />

            <TextField
              name="instalation_date"
              className={classes.inputs}
              value={formData.instalation_date}
              onChange={handleChangeInput}
              label="Data de Instalação"
              type="date"
              helperText={error.instalation_date === "" ? "*Obrigatório" : error.instalation_date}
              error={error.instalation_date !== ""}
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
              InputProps={{
                inputComponent: CPFInput
              }}
              required
              helperText={error.cpf_client === "" ? "*Obrigatório" : error.cpf_client}
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
              helperText="*Obrigatório"
              required
              autoComplete="off"
              variant="filled"
              inputRef={observationRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <ModalRedirect openModal={openModal} closeModal={() => setOpenModal(false)}/>
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
