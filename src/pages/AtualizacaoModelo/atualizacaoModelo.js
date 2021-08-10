import React, { useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Backdrop,
  CircularProgress
} from "@material-ui/core"
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStyles } from './atualizacaoModeloStyle'
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { AuthContext } from '../../context/AuthContext'

import MaskedInput from 'react-text-mask';

import Slider from '@material-ui/core/Slider';


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

function AtualizacaoModelo() {
  const { id } = useParams();
  const history = useHistory();

  const [updating, setUpdating] = useState(false);
  const [model, setModel] = useState({});
  const [modelOriginal, setModelOriginal] = useState({});
  const [valTempOriginal, setValTempOriginal] = useState([]);
  const [valCurrentOriginal, setValCurrentOriginal] = useState([]);
  const [valVoltOriginal, setValVoltOriginal] = useState([]);
  const [valVibraOriginal, setValVibraOriginal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    releaseYear: '',
  });
  const [valTemp, setValTemp]=useState([]);
  const [valCurrent, setValCurrent]=useState([]);
  const [valVolt, setValVolt]=useState([]);
  const [valVibra, setValVibra]=useState([]);

  const { sendMessage } = useContext(AuthContext);
  useEffect(()=> console.log(model),[model])
  useEffect(() => {
    (async () => {
      await api.get(`model/${id}`)
        .then((selected) => {
          const response = selected.data.model
          setModel(selected.data.model)
          setModelOriginal(selected.data.model)
          setValTempOriginal([response.min_temp, response.max_temp])
          setValCurrentOriginal([response.min_current, response.max_current])
          setValVoltOriginal([response.min_voltage, response.max_voltage])
          setValVibraOriginal([response.min_vibra, response.max_vibra])
          setValTemp([response.min_temp, response.max_temp])
          setValCurrent([response.min_current, response.max_current])
          setValVolt([response.min_voltage, response.max_voltage])
          setValVibra([response.min_vibra, response.max_vibra])
          // console.log(selected.data.model, 'Joao Gatao')
        })
        .catch(err => {
          console.error("Backend is not working properly", err);
        });
      setLoading(false)
    })();
  }, [id])

  // Aqui temos as funcoes para as faixas de valores
  const updateRangeTemp=(e,data)=>{ 
    setValTemp(data) 
    setModel({ ...model, min_temp: data[0], max_temp: data[1] })
  };
  const updateRangeCurrent=(e,data)=>{ 
    setValCurrent(data) 
    setModel({ ...model, min_current: data[0], max_current: data[1] })
  };
  const updateRangeVolt=(e,data)=>{ 
    setValVolt(data) 
    setModel({ ...model, min_voltage: data[0], max_voltage: data[1] })
  };
  const updateRangeVibra=(e,data)=>{ 
    setValVibra(data) 
    setModel({ ...model, min_vibra: data[0], max_vibra: data[1] })
  };
  const marcadoresTemp = [
    {
      value: 0,
      label: '0°C',
    },
    {
      value: 20,
      label: '20°C',
    },
    {
      value: 37,
      label: '37°C',
    },
    {
      value: 100,
      label: '100°C',
    },
  ];
  const marcadoresCurrent = [
    {
      value: 0,
      label: '0A',
    },
    {
      value: 30,
      label: '30A',
    },
    {
      value: 60,
      label: '60A',
    },
    {
      value: 100,
      label: '100A',
    },
  ];
  const marcadoresVolt = [
    {
      value: 0,
      label: '0V',
    },
    {
      value: 40,
      label: '40V',
    },
    {
      value: 76,
      label: '76V',
    },
    {
      value: 100,
      label: '100V',
    },
  ];
  const marcadoresVibra = [
    {
      value: 0,
      label: '0rpm',
    },
    {
      value: 2000,
      label: '2krpm',
    },
    {
      value: 6000,
      label: '6krpm',
    },
    {
      value: 10000,
      label: '10krpm',
    },
  ];

  const classes = useStyles({ updating });

  if (!model) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>
            Detalhes do Modelo
          </h1>
          <Paper className={classes.containerForm} elevation={0}>
            <Typography variant="h5">Dados inválidos!</Typography>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setModel({ ...model, [name]: value });
  }

  function handleSubmit() {
    setError({
      releaseYear: "",
    })
    if (!updating) setUpdating(true)
    else if (Object.values(model).includes("")) {
      sendMessage('Alguns campos estão vazios', 'info');
    }
    else if (!findError("year", model.releaseYear))
      setError(prev => ({ ...prev, releaseYear: "Data inválido" }))
    else if (isAfter(parseISO(model.releaseYear), new Date()))
      setError(prev => ({ ...prev, releaseYear: "Ano inválido!" }))
    else {
      // console.log(model, 'model que vai pro back!!')
      const {
        modelName,
        type,
        manufacturer,
        releaseYear,
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra,
      } = model;
      const data = {
        modelName,
        type,
        manufacturer,
        releaseYear,
        min_temp,
        max_temp,
        min_current,
        max_current,
        min_voltage,
        max_voltage,
        min_vibra,
        max_vibra,
      }
      sendMessage("Alterando dados...", "info", null);
      api.put(`model/${id}`, data)
        .then(response => {
          sendMessage("Dados alterados");
          setModelOriginal(data);
          console.log(data, 'Dados depois de alterar');
        })
        .catch(err => {
          console.log(err);
          sendMessage(`Erro: ${err.message}`, "error");
        })
      setUpdating(false)

    }
  }

  //Esta funcao vai verificar se existe algum equipamento com o id do modelo em questao
  async function DeleteVerification() {
    const response = await api.get("/equipment/index");
    console.log(response);
    if (response.data.equipment.find((x)=> {if(x.id_model === id) return true})) { //se achar algo nao pode excluir
      sendMessage("Não foi possível excluir modelo, ele possui equipamentos vinculados.", "error");
      setDeleting(false);
    }
    else {//Caso nao tenha nenhuma bomba ligada ao modelo, pode excluir
      handleDelete(true);
    }
  }

  async function handleDelete(confirmation) {
    if (updating) { //cancelar
      setUpdating(false);
      setModel(modelOriginal);
      setValTemp(valTempOriginal);
      setValCurrent(valCurrentOriginal);
      setValVolt(valVoltOriginal);
      setValVibra(valVibraOriginal);
      setError({
        releaseYear: "",
      })
    }
    else if (confirmation === true) { // excuir de verdade
      setDeleting(false);
      await api.delete(`model/${id}`).then((response) => {

        sendMessage("Modelo excluído com sucesso", "success");
        setTimeout(() => {
          history.push("/listagemmodelo");
        }, 1000)
        
      }).catch((err) => {
        sendMessage(`Erro ao excluir o modelo: ${err.message}`, "error");
        console.log(err)
      })
    }
    else { // confirmar exclusão
      setDeleting(true);
    }
  }

  const AreYouSure = () => (
    <Dialog
      open={deleting}
      onClose={() => setDeleting(false)}
    >
      <DialogTitle>Excluir modelo?</DialogTitle>
   
      <DialogActions>
        <Button color="primary" onClick={() => setDeleting(false)}>
          Cancelar
          </Button>
        <Button color="secondary" onClick={() => DeleteVerification()} >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );

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

        <h1 className={classes.title}>
          Detalhes do Modelo
        </h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <Grid container>
            <Grid item xs={12} md={12} className={classes.grid}>
              <TextField
                name="modelName"
                className={classes.input}
                value={model.modelName}
                onChange={handleChangeInput}
                label="Nome do modelo"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                autoFocus
                disabled={!updating}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                value={model.type}
                className={classes.input}
                name="type"
                onChange={handleChangeInput}
                disabled={!updating}
                label="Tipo de equipamento"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
              />
              <TextField
                name="manufacturer"
                className={classes.input}
                value={model.manufacturer}
                onChange={handleChangeInput}
                label="Fabricante"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="releaseYear"
                className={classes.input}
                value={model.releaseYear}
                onChange={handleChangeInput}
                label="Ano de lançamento"
                type="text"
                helperText={error.releaseYear === "" ? "*Obrigatório" : error.releaseYear}
                error={error.releaseYear !== ""}
                variant="filled"
                autoComplete="off"
                disabled={!updating}
                InputProps={{
                  inputComponent: YearInput
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.grid}>
              <div style={{width:300,margin:30}}>
                <Typography id="range-slider-Temp" gutterBottom>
                  Limites de Temperatura
                </Typography>
                <Slider
                value={valTemp}
                onChange={updateRangeTemp}
                marks={marcadoresTemp}
                valueLabelDisplay="auto"
                disabled={!updating}
                />
                <Typography id="range-slider-Current" gutterBottom>
                  Limites de Corrente
                </Typography>
                <Slider
                value={valCurrent}
                onChange={updateRangeCurrent}
                marks={marcadoresCurrent}
                valueLabelDisplay="auto"
                disabled={!updating}
                />
                <Typography id="range-slider-Volt" gutterBottom>
                  Limites de Tensão
                </Typography>
                <Slider
                value={valVolt}
                onChange={updateRangeVolt}
                marks={marcadoresVolt}
                valueLabelDisplay="auto"
                disabled={!updating}
                />
                <Typography id="range-slider-Vibra" gutterBottom>
                  Limites de Vibração
                </Typography>
                <Slider
                  value={valVibra}
                  max={10000}
                  step={500}
                  onChange={updateRangeVibra}
                  marks={marcadoresVibra}
                  valueLabelDisplay="auto"
                  disabled={!updating}
                />
              </div>
            </Grid>
            <Grid className={classes.centralizar} item xs={12}>
              <Button variant="contained" color="primary" className={classes.btn}
                onClick={handleSubmit}
              >
                {updating ? "Salvar" : "Editar"}
              </Button>
              <Button variant="contained" color="secondary" className={classes.btn}
                onClick={handleDelete}
              >
                {updating ? "Cancelar" : "Excluir"}
              </Button>

            </Grid>
          </Grid>
        </Paper>

      </div>
    </React.Fragment >
  );
}

export default AtualizacaoModelo;
