import React, { useState, useRef } from 'react';

import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
  Select,
  MenuItem,
} from "@material-ui/core"
import { Autocomplete } from '@material-ui/lab'

import { useStyles } from './cadastroModeloStyle';
import nextInput from '../../services/nextInput';

export default function CadastroModelo(props) {
  const classes = useStyles();

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    modelName: '',
    type: '',
    manufacturer: '',
    releaseYear: '',
    temperatureLimit: '',
    currentLimit: '',
    voltageLimit: ''
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData);
  }

  // Referencias (próximo a declaração de um ponteiro nulo)
  const modelNameRef = useRef(null);
  const typeRef = useRef(null);
  const manufacturerRef = useRef(null);
  const releaseYearRef = useRef(null);
  const temperatureLimitRef = useRef(null);
  const currentLimitRef = useRef(null);
  const voltageLimitRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "modelName", ref: typeRef },
    { name: "type", ref: manufacturerRef },
    { name: "manufacturer", ref: releaseYearRef },
    { name: "releaseYear", ref: temperatureLimitRef },
    { name: "temperatureLimit", ref: currentLimitRef },
    { name: "currentLimit", ref: voltageLimitRef },
    { name: "voltageLimit", ref: buttonSubmitRef },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
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
                  options={["Motor", "Bomba hidráulica"]}
                  renderInput={params => (
                    <TextField
                      name="type"
                      {...params}
                      className={classes.inputs}
                      value={formData.type}
                      onChange={handleChangeInput}
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
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
                  inputRef={releaseYearRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)} />
              </Grid>
              <Grid item xs={12} md={6}>
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
