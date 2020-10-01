import React, { useState, useRef } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Snackbar,
  CircularProgress,
  Backdrop
} from "@material-ui/core"
import { Alert, Autocomplete } from '@material-ui/lab'
import MaskedInput from 'react-text-mask'
import { useStyles } from './cadastroEquipamentoStyle';
import nextInput from '../../services/nextInput';
import findError from '../../services/findError';
import api from '../../services/api';
import { format, parseISO } from 'date-fns';

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
  const [openMensage, setOpenMensage] = React.useState({
    open: false, message: 'Cadastrado com sucesso', type: 'success', time: 5000
  });
  const [error, setError] = React.useState({
    cpf_client: "",
  });
  const [models, setModels] = React.useState([{}]);
  const [loading, setLoading] = useState(true);

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    id_model: "132",
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
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
          setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
        }
        setOpenMensage(({ open: true, message: `Error 504: ${error.message}`, type: 'error', time: 5000 }));
      });
    setLoading(false)
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    setError({
      cpf_client: "",
    })

    // coloque os opcionais por ultimo e para cada um adione um pop()
    let formDataWithoutNotRequired = Object.values(formData);
    // formDataWithoutNotRequired.pop()
    if (formDataWithoutNotRequired.includes("")) {
      setOpenMensage(({ open: true, message: 'Alguns campos estão vazios', type: 'info', time: 5000 }));
    }
    else if (!findError("cpf/cnpj", formData.cpf_client))
      setError(prev => ({ ...prev, cpf_client: "CPF/CNPJ inválido!" }))
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

      //enviar para o backend
      setOpenMensage(({ open: true, message: 'Realizando cadastro...', type: 'info', time: null }));
      api.post('/equipment/create', data)
        .then(res => {
          setFormData({
            id_model: "132",
            id_equipment: "",
            equipment_model: "",
            instalation_date: format(new Date(), "yyyy-MM-dd"),
            situation: "Ok",
            cpf_client: "",
            //opcionais
            observation: "",
          });
          console.log(res);
          setOpenMensage(({ open: true, message: 'Cadastrado com sucesso', type: 'success', time: 5000 }));
        })
        .catch(error => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
          }
          setOpenMensage(({ open: true, message: `Error: ${error.message}`, type: 'error', time: 5000 }));
        })
    }
  }

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    if (valueA)
      setFormData({ ...formData, equipment_model: valueA });
    else
      setFormData({ ...formData, [name]: value });
  }

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(prev => ({ ...prev, open: false }));
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

      <Snackbar autoHideDuration={openMensage.time} open={openMensage.open} onClose={handleCloseMensage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert elevation={6} variant="filled" severity={openMensage.type}>
          {openMensage.message}
        </Alert>
      </Snackbar>

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
              helperText="*Obrigatório"
              variant="filled"
              defaultValue="2020-09-22"
              autoComplete="off"
              inputRef={instalationDateRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="cpf_client"
              className={classes.inputs}
              value={formData.cpf_client}
              onChange={handleChangeInput}
              label="CPF"
              type="text"
              InputProps={{
                inputComponent: CPFInput
              }}
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
              helperText="Opcional"
              variant="filled"
              inputRef={observationRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <div>
              <Button type="submit"
                ref={buttonSubmitRef} // neste caso o button pode ser acessado 
                // diretamente por isso usamos ref={}
                className={classes.buttonRegister}>Cadastrar</Button>
            </div>

          </div>

        </form>
      </div>

    </React.Fragment>
  )
}
