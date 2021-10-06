import React, { useState, useRef, useContext } from 'react';
import api from '../../services/api';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useMediaQuery,
} from "@material-ui/core"
import findError from '../../services/findError';
import { useStyles } from './cadastroModeloStyle';
import { LoginContext } from '../../context/LoginContext';
import { AuthContext } from "../../context/AuthContext";

export default function CadastroModelo(props) {

  const classes = useStyles();
  const { sendMessage } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width:960px)");
  const buttonSubmitRef = useRef(null);
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();

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

    const data = formData;

    setError({
      releaseYear: "",
    })

    if (Object.values(data).includes("")) {
      sendMessage("Alguns campos estão vazios!", "error");
    } else if (!findError("year", data.releaseYear)) {
      setError(prev => ({ ...prev, releaseYear: "Ano inválido" }))
    } else {

      // enviar para o backend
      sendMessage("Realizando cadastro...", "info", null);

      api
        .post('/model/create', data, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((response) => {

          console.log(response);
          sendMessage("Modelo cadastrado com sucesso", "success")
        })
        .catch(error => {
          sendMessage("Erro ao cadastrar modelo!", "error");
          console.log(error);
        })
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo Modelo
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>
          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={isDesktop ? 2 : 0} >

              <Grid item xs={12} md={6}>
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
                />

                <TextField
                  name="type"
                  className={classes.inputs}
                  value={formData.type}
                  onChange={handleChangeInput}
                  label="Tipo de equipamento"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled"
                  autoComplete="off"
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
                />

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
                  inputProps={{ maxLength: 4 }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography gutterBottom className={classes.rangesTitle}>
                  Limites de Temperatura
                </Typography>

                <div className={classes.rangesContainer}>
                  <TextField
                    className={classes.inputRange}
                    name="min_temp"
                    helperText="mínimo"
                    label="°C"
                    variant="filled"
                    value={formData.min_temp}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                  <TextField
                    name="max_temp"
                    className={classes.inputRange}
                    helperText="máximo"
                    label="°C"
                    variant="filled"
                    value={formData.max_temp}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                </div>

                <Typography gutterBottom className={classes.rangesTitle}>
                  Limites de Corrente
                </Typography>

                <div className={classes.rangesContainer}>
                  <TextField
                    name="min_current"
                    className={classes.inputRange}
                    helperText="mínimo"
                    label="A"
                    variant="filled"
                    value={formData.min_current}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                  <TextField
                    name="max_current"
                    className={classes.inputRange}
                    helperText="máximo"
                    label="A"
                    variant="filled"
                    value={formData.max_current}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                </div>

                <Typography gutterBottom className={classes.rangesTitle}>
                  Limites de Tensão
                </Typography>

                <div className={classes.rangesContainer}>
                  <TextField
                    name="min_voltage"
                    className={classes.inputRange}
                    helperText="mínimo"
                    label="V"
                    variant="filled"
                    value={formData.min_voltage}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                  <TextField
                    name="max_voltage"
                    className={classes.inputRange}
                    helperText="máximo"
                    label="V"
                    variant="filled"
                    value={formData.max_voltage}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                </div>

                <Typography gutterBottom className={classes.rangesTitle}>
                  Limites de Vibração
                </Typography>

                <div className={classes.rangesContainer}>
                  <TextField
                    name="min_vibra"
                    className={classes.inputRange}
                    helperText="mínimo"
                    label="krpm"
                    variant="filled"
                    value={formData.min_vibra}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                  <TextField
                    name="max_vibra"
                    className={classes.inputRange}
                    helperText="máximo"
                    label="krpm"
                    variant="filled"
                    value={formData.max_vibra}
                    margin="dense"
                    onChange={handleChangeInput}
                    type='number'
                  />
                </div>
              </Grid>
            </Grid>

            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                ref={buttonSubmitRef}
                className={classes.buttonRegister}
              >
                Cadastrar
              </Button>
            </div>

          </form>
        </Paper>
      </div >

    </React.Fragment >
  )
}
