import React, { useState, useRef } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Snackbar,
  FormControl,
  InputLabel,
  FilledInput,
  FormHelperText
} from "@material-ui/core"
import { Alert, Autocomplete } from '@material-ui/lab'
import MaskedInput from 'react-text-mask'
import { useStyles } from './cadastroEquipamentoStyle';
import nextInput from '../../services/nextInput';
import findError from '../../services/findError';

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
  const [openMensage, setOpenMensage] = React.useState(false);
  const [error, setError] = React.useState({
    equipment_model: "",
    id_equipment: "",
    instalation_date: "",
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
      equipment_model: "",
      id_equipment: "",
      instalation_date: "",
      cpf_client: "",
    })
    if (!findError("cpf/cnpj", formData.cpf_client))
      setError(prev => ({ ...prev, cpf_client: "CPF inválido!" }))
    else setOpenMensage(true);
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
    setOpenMensage(false);
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

      <Snackbar autoHideDuration={4000} open={openMensage} onClose={handleCloseMensage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert elevation={6} variant="filled" severity="success">
          Cadastrado com sucesso
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
                inputComponent: CPFInput,
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
