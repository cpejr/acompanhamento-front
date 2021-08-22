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
  Slider
} from "@material-ui/core"
import findError from '../../services/findError';
import { useStyles } from './cadastroModeloStyle';
import nextInput from '../../services/nextInput';
import { LoginContext } from '../../context/LoginContext';
import { AuthContext } from "../../context/AuthContext";

const TEMPERATURE_SCALE_LOWEST = 0;
const TEMPERATURE_SCALE_HIGHEST = 100;
const CURRENT_SCALE_LOWEST = 0;
const CURRENT_SCALE_HIGHEST = 100;
const VOLTAGE_SCALE_LOWEST = 0;
const VOLTAGE_SCALE_HIGHEST = 100;
const VIBRATION_SCALE_LOWEST = 0;
const VIBRATION_SCALE_HIGHEST = 10000;

const marcadoresTemp = [
  {
    value: TEMPERATURE_SCALE_LOWEST,
    label: `${TEMPERATURE_SCALE_LOWEST}°C`
  },
  {
    value: TEMPERATURE_SCALE_HIGHEST,
    label: `${TEMPERATURE_SCALE_HIGHEST}°C`
  }
];
const marcadoresCurrent = [
  {
    value: CURRENT_SCALE_LOWEST,
    label: `${CURRENT_SCALE_LOWEST}A`
  },
  {
    value: CURRENT_SCALE_HIGHEST,
    label: `${CURRENT_SCALE_HIGHEST}A`
  }
];
const marcadoresVolt = [
  {
    value: VOLTAGE_SCALE_LOWEST,
    label: `${VOLTAGE_SCALE_LOWEST}V`
  },
  {
    value: VOLTAGE_SCALE_HIGHEST,
    label: `${VOLTAGE_SCALE_HIGHEST}V`
  }
];
const marcadoresVibra = [
  {
    value: VIBRATION_SCALE_LOWEST,
    label: `${VIBRATION_SCALE_LOWEST}krpm`
  },
  {
    value: VIBRATION_SCALE_HIGHEST,
    label: `${VIBRATION_SCALE_HIGHEST}krpm`
  }
];

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

  const [valTemp, setValTemp] = useState([TEMPERATURE_SCALE_LOWEST, TEMPERATURE_SCALE_HIGHEST]);
  const [valCurrent, setValCurrent] = useState([CURRENT_SCALE_LOWEST, CURRENT_SCALE_HIGHEST]);
  const [valVolt, setValVolt] = useState([VOLTAGE_SCALE_LOWEST, VOLTAGE_SCALE_HIGHEST]);
  const [valVibra, setValVibra] = useState([VIBRATION_SCALE_LOWEST, VIBRATION_SCALE_HIGHEST]);

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    if (valueA)
      setFormData({ ...formData, type: valueA });
    else
      setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {

    event.preventDefault();

    const data = {
      modelName: formData.modelName,
      type: formData.type,
      manufacturer: formData.manufacturer,
      releaseYear: formData.releaseYear,
      min_temp: formData.min_temp ? formData.min_temp : valTemp[0],
      max_temp: formData.max_temp ? formData.max_temp : valTemp[1],
      min_current: formData.min_current ? formData.min_current : valCurrent[0],
      max_current: formData.max_current ? formData.max_current : valCurrent[1],
      min_voltage: formData.min_voltage ? formData.min_voltage : valVolt[0],
      max_voltage: formData.max_voltage ? formData.max_voltage : valVolt[1],
      min_vibra: formData.min_vibra ? formData.min_vibra : valVibra[0],
      max_vibra: formData.max_vibra ? formData.max_vibra : valVibra[1]
    }

    // const temperature = document.getElementById("temperatureSlider");
    // console.log(temperature.getElementsByTagName("input")[0].value);

    setError({
      releaseYear: "",
    })

    if (Object.values(data).includes("")) {
      sendMessage("Alguns campos estão vazios!", "error");
    }

    else if (!findError("year", data.releaseYear))
      setError(prev => ({ ...prev, releaseYear: "Ano inválido" }))

    else {

      // enviar para o backend
      sendMessage("Realizando cadastro...", "info", null);

      api
        .post('/model/create', data, {headers: {authorization: `Bearer ${accessToken}`}})
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

  // Aqui temos as funcoes para as faixas de valores
  // O Slider ele sempre vai de 0 até 100, mas tem como mudar a escala, quando definir os limites colocamos as escalas

  const updateRangeTemp = (e, data) => {
    setValTemp(data)
    setFormData({ ...formData, min_temp: data[0], max_temp: data[1] })
  };

  const updateRangeCurrent = (e, data) => {
    setValCurrent(data)
    setFormData({ ...formData, min_current: data[0], max_current: data[1] })
  };

  const updateRangeVolt = (e, data) => {
    setValVolt(data)
    setFormData({ ...formData, min_voltage: data[0], max_voltage: data[1] })
  };

  const updateRangeVibra = (e, data) => {
    setValVibra(data);
    setFormData({ ...formData, min_vibra: data[0], max_vibra: data[1] })
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo Modelo
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>
          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={isDesktop ? 5 : 0} >
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
                  autoFocus
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
                  autoFocus
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Temperatura
                  </Typography>
                  <Slider
                    id="temperatureSlider"
                    value={valTemp}
                    onChangeCommitted={updateRangeTemp}
                    marks={marcadoresTemp}
                    valueLabelDisplay="auto"
                    className={classes.slider}
                  />

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Corrente
                  </Typography>
                  <Slider
                    id="currentSlider"
                    value={valCurrent}
                    onChangeCommitted={updateRangeCurrent}
                    marks={marcadoresCurrent}
                    valueLabelDisplay="auto"
                    className={classes.slider}
                  />

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Tensão
                  </Typography>
                  <Slider
                    id="voltageSlider"
                    value={valVolt}
                    onChangeCommitted={updateRangeVolt}
                    marks={marcadoresVolt}
                    valueLabelDisplay="auto"
                    className={classes.slider}
                  />

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Vibração
                  </Typography>
                  <Slider
                    id="vibraSlider"
                    value={valVibra}
                    onChangeCommitted={updateRangeVibra}
                    marks={marcadoresVibra}
                    valueLabelDisplay="auto"
                    className={classes.slider}
                    min={0}
                    max={10000}
                    step={500}
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
