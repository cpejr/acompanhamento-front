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

// const TEMPERATURE_SCALE_LOWEST = 0;
// const TEMPERATURE_SCALE_HIGHEST = 100;
// const CURRENT_SCALE_LOWEST = 0;
// const CURRENT_SCALE_HIGHEST = 100;
// const VOLTAGE_SCALE_LOWEST = 0;
// const VOLTAGE_SCALE_HIGHEST = 100;
// const VIBRATION_SCALE_LOWEST = 0;
// const VIBRATION_SCALE_HIGHEST = 10000;

// const marcadoresTemp = [
//   {
//     value: TEMPERATURE_SCALE_LOWEST,
//     label: `${TEMPERATURE_SCALE_LOWEST}°C`
//   },
//   {
//     value: TEMPERATURE_SCALE_HIGHEST,
//     label: `${TEMPERATURE_SCALE_HIGHEST}°C`
//   }
// ];
// const marcadoresCurrent = [
//   {
//     value: CURRENT_SCALE_LOWEST,
//     label: `${CURRENT_SCALE_LOWEST}A`
//   },
//   {
//     value: CURRENT_SCALE_HIGHEST,
//     label: `${CURRENT_SCALE_HIGHEST}A`
//   }
// ];
// const marcadoresVolt = [
//   {
//     value: VOLTAGE_SCALE_LOWEST,
//     label: `${VOLTAGE_SCALE_LOWEST}V`
//   },
//   {
//     value: VOLTAGE_SCALE_HIGHEST,
//     label: `${VOLTAGE_SCALE_HIGHEST}V`
//   }
// ];
// const marcadoresVibra = [
//   {
//     value: VIBRATION_SCALE_LOWEST,
//     label: `${VIBRATION_SCALE_LOWEST}krpm`
//   },
//   {
//     value: VIBRATION_SCALE_HIGHEST,
//     label: `${VIBRATION_SCALE_HIGHEST}krpm`
//   }
// ];

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

  const valTemp = [];
  const valCurrent = [];
  const valVolt = [];
  const valVibra = [];

  // Definição de estados, min e max, de cada tipo de informação
  // Raphael, caso isso seja desnecessário, favor me informar para que eu possa refatorar
  const [minTemp, setMinTemp] = useState( ); 
  const [maxTemp, setMaxTemp] = useState( ); 
  const [minCurrent, setMinCurrent] = useState( ); 
  const [maxCurrent, setMaxCurrent] = useState( ); 
  const [minVolt , setMinVolt] = useState( );
  const [maxVolt, setMaxVolt] = useState( );
  const [minVibra, setMinVibra] = useState( );
  const [maxVibra, setMaxVibra] = useState( );

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

  // Aqui temos as funcoes que escutam os valores digitados nos inputs e os definem no formData
  // Raphael, aqui pode ser que não tenha ficado o mais otimizado possível, caso não esteja adequado, favor me informar
  const updateMinTemp = (e) => {

    setMinTemp(e.target.value);
    valTemp[0] = minTemp;
    // console.log(valTemp[0]);
    setFormData({ ...formData, min_temp: e.target.value })
  };
  const updateMaxTemp = (e) => {

    setMaxTemp(e.target.value);
    valTemp[1] = maxTemp;
    // console.log(valTemp[1]);
    setFormData({ ...formData, max_temp: e.target.value })
  };
  const updateMinCurrent = (e) => {

    setMinCurrent(e.target.value);
    valCurrent[0] = minCurrent;
    // console.log(valCurrent[0]);
    setFormData({ ...formData, min_current: e.target.value })
  };
  const updateMaxCurrent = (e) => {

    setMaxCurrent(e.target.value);
    valCurrent[1] = maxCurrent;
    // console.log(valCurrent[1]);
    setFormData({ ...formData, max_current: e.target.value })
  };
  const updateMinVolt = (e) => {

    setMinVolt(e.target.value);
    valVolt[0] = minVolt;
    // console.log(valVolt[0]);
    setFormData({ ...formData, min_voltage: e.target.value })
  };
  const updateMaxVolt = (e) => {

    setMaxVolt(e.target.value);
    valVolt[1] = maxVolt;
    // console.log(valVolt[1]);
    setFormData({ ...formData, max_voltage: e.target.value })
  };
  const updateMinVibra = (e) => {

    setMinVibra(e.target.value);
    valVibra[0] = minVibra;
    // console.log(valVibra[0]);
    setFormData({ ...formData, min_vibra: e.target.value })
  };
  const updateMaxVibra = (e) => {

    setMaxVibra(e.target.value);
    valVibra[1] = maxVibra;
    // console.log(valVibra[1]);
    setFormData({ ...formData, max_vibra: e.target.value })
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
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Temperatura
                  </Typography>
                  {/* As divs foram criadas dessa forma para possibilitar o alinhamento dos inputs */}
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{marginRight: "50px"}}>
                      <TextField
                        className={classes.inputRange}
                        name="tempMin"
                        helperText= "mínimo"
                        label = "°C"
                        variant="filled"
                        value={minTemp}
                        margin="dense"
                        onChange={updateMinTemp} // input min
                        inputProps = {{step:1, min: 0, max: 100}} // permite dispensar os marcadores - linha 26 ...
                        type = 'number' 
                      />
                    </div>
                    <div>
                      <TextField
                        className={classes.inputRange}
                        helperText= "máximo"
                        label = "°C"
                        variant="filled"
                        value={maxTemp}
                        margin="dense"
                        onChange={updateMaxTemp} // input max
                        inputProps = {{step:1, min: 0, max: 100}} 
                        type = 'number' 
                      />
                    </div>
                  </div>  
                 
                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Corrente
                  </Typography>
                  
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{marginRight: "50px"}}>
                      <TextField
                        className={classes.inputRange}
                        helperText= "mínimo"
                        label = "A"
                        variant="filled"
                        value={minCurrent}
                        margin="dense"
                        onChange={updateMinCurrent} // input min
                        inputProps = {{step:1, min: 0, max: 100}}
                        type = 'number' 
                        /> 
                    </div>
                    <div>
                      <TextField
                        className={classes.inputRange}
                        helperText= "máximo"
                        label = "A"
                        variant="filled"
                        value={maxCurrent}
                        margin="dense"
                        onChange={updateMaxCurrent} // input max
                        inputProps = {{step:1, min: 0, max: 100}}
                        type = 'number' 
                        />
                    </div>
                  </div> 

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Tensão
                  </Typography>
                  
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{marginRight: "50px"}}>
                      <TextField
                        className={classes.inputRange}
                        helperText= "mínimo"
                        label = "V"
                        variant="filled"
                        value={minVolt}
                        margin="dense"
                        onChange={updateMinVolt} // input min
                        inputProps = {{step:1, min: 0, max: 100}}
                        type = 'number' 
                        /> 
                    </div>
                    <div>
                      <TextField
                        className={classes.inputRange}
                        helperText= "máximo"
                        label = "V"
                        variant="filled"
                        value={maxVolt}
                        margin="dense"
                        onChange={updateMaxVolt} // input max
                        inputProps = {{step:1, min: 0, max: 100}}
                        type = 'number' 
                        /> 
                    </div>
                  </div>

                  <Typography gutterBottom style={{ marginTop: "16px" }}>
                    Limites de Vibração
                  </Typography>
                  
                  <div style={{display: "flex", flexDirection: "row"}}>
                    <div style={{marginRight: "50px"}}>
                      <TextField
                        className={classes.inputRange}
                        helperText= "mínimo"
                        label = "krpm"
                        variant="filled"
                        value={minVibra}
                        margin="dense"
                        onChange={updateMinVibra} // input min
                        inputProps = {{step:1, min: 0, max: 10000}}
                        type = 'number' 
                      />
                    </div>
                    <div>
                      <TextField
                        className={classes.inputRange}
                        helperText= "máximo"
                        label = "krpm"
                        variant="filled"
                        value={maxVibra}
                        margin="dense"
                        onChange={updateMaxVibra} // input max
                        inputProps = {{step:1, min: 0, max: 10000}}
                        type = 'number' 
                        />
                    </div>
                  </div> 
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
