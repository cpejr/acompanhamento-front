import React, { useState, useRef } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Snackbar,
} from "@material-ui/core"
import { Alert, Autocomplete } from '@material-ui/lab'
import MaskedInput from 'react-text-mask'
import { useStyles } from './cadastroEquipamentoStyle';
import nextInput from '../../services/nextInput';
import findError from '../../services/findError';
import api from '../../services/api';

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

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    equipment_model: "",
    id_equipment: "",
    instalation_date: "2020-09-22",
    cpf_client: "",
  });

  function handleSubmit(event) {
    event.preventDefault()
    console.log(formData);
    setError({
      cpf_client: "",
    })
    if (Object.values(formData).includes("")) {
      setOpenMensage(({ open: true, message: 'Alguns campos estão vazios', type: 'info', time: 5000 }));
    }
    else if (!findError("cpf/cnpj", formData.cpf_client))
      setError(prev => ({ ...prev, cpf_client: "CPF/CNPJ inválido!" }))
    else {
      const data = {
        equipment_model: formData.equipment_model,
        id_equipment: formData.id_equipment,
        instalation_date: formData.instalation_date,
        cpf_client: formData.cpf_client,
      }

      //enviar para o backend
      setOpenMensage(({ open: true, message: 'Realizando cadastro...', type: 'info', time: null }));
      api.post('/model/create', data)
        .then(res => {
          setFormData({
            modelName: '',
            type: '',
            manufacturer: '',
            releaseYear: '',
            temperatureLimit: '',
            currentLimit: '',
            voltageLimit: ''
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
          console.error(error);
          setOpenMensage(({ open: true, message: `Error 504: ${error.message}`, type: 'error', time: 5000 }));
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
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "equipment_model", ref: idEquipmentRef },
    { name: "id_equipment", ref: instalationDateRef },
    { name: "instalation_date", ref: cpfClientRef },
    { name: "cpf_client", ref: buttonSubmitRef }
  ];

  const classes = useStyles();

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
              options={["Bomba submersa", "Bomba centrífuga", "Bomba autoaspirante", "Bomba periférica", "Bomba injetora"]}
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
