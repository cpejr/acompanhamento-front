import React, { useState, useRef } from 'react';
import api from '../../services/api';

import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  Snackbar
} from "@material-ui/core"
import { Alert, Autocomplete } from '@material-ui/lab';
import MaskedInput from 'react-text-mask';
import findError from '../../services/findError';

import { useStyles } from './cadastroModeloStyle';
import nextInput from '../../services/nextInput';

function YearInput(props) {
  const { inputRef, ...other } = props;
  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/, /\d/, /\d/, /\d/]}
    />
  );
}

export default function CadastroModelo(props) {
  const [openMensage, setOpenMensage] = React.useState({
    open: false, message: 'Cadastrado com sucesso', type: 'success', time: 5000
  });
  const classes = useStyles();

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    modelName: '',
    type: '',
    manufacturer: '',
    releaseYear: '',
    min_temp: '',
    max_temp: '',
    min_current: '',
    max_current: '',
    min_voltage: '',
    max_voltage: '',
    min_vibra: '',
    max_vibra: '',
  });
  const [error, setError] = useState({
    releaseYear: '',
  });

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    if (valueA)
      setFormData({ ...formData, type: valueA });
    else
      setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
    setError({
      releaseYear: "",
    })

    if (Object.values(formData).includes("")) {
      setOpenMensage(({ open: true, message: 'Alguns campos estão vazios', type: 'info', time: 5000 }));
    }
    else if (!findError("year", formData.releaseYear))
      setError(prev => ({ ...prev, releaseYear: "Ano inválido" }))
    else {
      const data = {
        modelName: formData.modelName,
        type: formData.type,
        manufacturer: formData.manufacturer,
        releaseYear: formData.releaseYear,
        min_temp: formData.min_temp,
        max_temp: formData.max_temp,
        min_current: formData.min_current,
        max_current: formData.max_current,
        min_voltage: formData.min_voltage,
        max_voltage: formData.max_voltage,
        min_vibra: formData.min_vibra,
        max_vibra: formData.max_vibra,
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
            min_temp: '',
            max_temp: '',
            min_current: '',
            max_current: '',
            min_voltage: '',
            max_voltage: '',
            min_vibra: '',
            max_vibra: ''
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

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(prev => ({ ...prev, open: false }));
  }

  // Referencias (próximo a declaração de um ponteiro nulo)
  const modelNameRef = useRef(null);
  const typeRef = useRef(null);
  const manufacturerRef = useRef(null);
  const releaseYearRef = useRef(null);
  const min_temp = useRef(null);
  const max_temp = useRef(null);
  const min_current = useRef(null);
  const max_current = useRef(null);
  const min_voltage = useRef(null);
  const max_voltage = useRef(null);
  const min_vibra = useRef(null);
  const max_vibra = useRef(null);
  // const temperatureLimitRef = useRef(null);
  // const currentLimitRef = useRef(null);
  // const voltageLimitRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "modelName", ref: typeRef },
    { name: "type", ref: manufacturerRef },
    { name: "manufacturer", ref: releaseYearRef },
    { name: "releaseYear", ref: min_temp },
    { name: "min_temp", ref: max_temp },
    { name: "max_temp", ref: min_current },
    { name: "min_current", ref: max_current },
    { name: "max_current", ref: min_voltage },
    { name: "min_voltage", ref: max_voltage },
    { name: "max_voltage", ref: min_vibra },
    { name: "min_vibra", ref: max_vibra },
    { name: "max_vibra", ref: buttonSubmitRef },
    // { name: "releaseYear", ref: temperatureLimitRef },
    // { name: "temperatureLimit", ref: currentLimitRef },
    // { name: "currentLimit", ref: voltageLimitRef },
    // { name: "voltageLimit", ref: buttonSubmitRef },
  ];

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
          Cadastro de um novo Modelo
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>
          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              name="modelName"
              className={classes.inputs}
              value={formData.modelName}
              onChange={handleChangeInput}
              label="Nome do modelo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              autoFocus
              inputRef={modelNameRef} // atribui um elemento a ref criada
              onKeyPress={e => nextInput(e, relacionamentosRef)} // manda a tecla apertada para a função analizar
            />
            <Grid container spacing={useMediaQuery('(min-width:960px)') ? 5 : 0}>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  freeSolo
                  className={classes.inputs}
                  options={["Motor", "Bomba hidráulica"]}
                  onChange={handleChangeInput}
                  value={formData.type}
                  renderInput={params => (
                    <TextField
                      name="type"
                      {...params}
                      label="Tipo de equipamento"
                      type="text"
                      helperText="*Obrigatório"
                      variant="filled"
                      autoComplete="off"
                      inputRef={typeRef}
                      onKeyPress={e => nextInput(e, relacionamentosRef)} />
                  )}
                />
                <TextField
                  name="manufacturer"
                  className={classes.inputs}
                  value={formData.manufacturer}
                  onChange={handleChangeInput}
                  label="Fabricante"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={manufacturerRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="releaseYear"
                  className={classes.inputs}
                  value={formData.releaseYear}
                  onChange={handleChangeInput}
                  label="Ano de lançamento"
                  type="text"
                  helperText={error.releaseYear === "" ? "*Obrigatório" : error.releaseYear}
                  error={error.releaseYear !== ""}
                  variant="filled"
                  autoComplete="off"
                  InputProps={{
                    inputComponent: YearInput
                  }}
                  inputRef={releaseYearRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
              </Grid>
              <Grid item xs={12} md={6}>
                {/* <TextField
                  name="min_temp"
                  className={classes.inputs}
                  value={formData.min_temp}
                  onChange={handleChangeInput}
                  label="Limite minimo de temperatura"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="max_temp"
                  className={classes.inputs}
                  value={formData.max_temp}
                  onChange={handleChangeInput}
                  label="Limite maximo de temperatura"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="min_current"
                  className={classes.inputs}
                  value={formData.min_current}
                  onChange={handleChangeInput}
                  label="Limite minimo de corrente"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="max_current"
                  className={classes.inputs}
                  value={formData.max_current}
                  onChange={handleChangeInput}
                  label="Limite maximo de corrente"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="min_voltage"
                  className={classes.inputs}
                  value={formData.min_voltage}
                  onChange={handleChangeInput}
                  label="Limite minimo de tensão"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="max_voltage"
                  className={classes.inputs}
                  value={formData.max_voltage}
                  onChange={handleChangeInput}
                  label="Limite maximo de tensão"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} /> 
                <TextField
                  name="min_vibra"
                  className={classes.inputs}
                  value={formData.min_vibra}
                  onChange={handleChangeInput}
                  label="Limite minimo de vibração"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} /> 
                <TextField
                  name="max_vibra"
                  className={classes.inputs}
                  value={formData.max_vibra}
                  onChange={handleChangeInput}
                  label="Limite maximo de vibração"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} /> */}
                <TextField
                  name="temperatureLimit"
                  className={classes.inputs}
                  value={formData.temperatureLimit}
                  onChange={handleChangeInput}
                  label="Limite temperatura"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={temperatureLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="currentLimit"
                  className={classes.inputs}
                  value={formData.currentLimit}
                  onChange={handleChangeInput}
                  label="Limite corrente"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={currentLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
                <TextField
                  name="voltageLimit"
                  className={classes.inputs}
                  value={formData.voltageLimit}
                  onChange={handleChangeInput}
                  label="Limite tensão"
                  type="number"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={voltageLimitRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
              </Grid>
            </Grid>
            <Button type="submit"
              ref={buttonSubmitRef} // neste caso o button pode ser acessado 
              // diretamente por isso usamos ref={}
              className={classes.buttonRegister}>Cadastrar</Button>
          </form>
        </Paper>
      </div >

    </React.Fragment >
  )
}
