import React, { useState, useEffect, useContext } from 'react';
import {
  CssBaseline,
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  Typography,
  Backdrop,
  CircularProgress,
  useMediaQuery
} from "@material-ui/core"
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStyles } from './atualizacaoModeloStyle'
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { AuthContext } from '../../context/AuthContext'
import Slider from '@material-ui/core/Slider';
import { LoginContext } from '../../context/LoginContext';
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

function AtualizacaoModelo() {

  const { id } = useParams();
  const history = useHistory();
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken()

  const { sendMessage } = useContext(AuthContext);
  const isDesktop = useMediaQuery("(min-width:960px)");

  const [updating, setUpdating] = useState(false);
  const [model, setModel] = useState({});
  const [modelOriginal, setModelOriginal] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    releaseYear: '',
  });
  const [valTemp, setValTemp] = useState([]);
  const [valCurrent, setValCurrent] = useState([]);
  const [valVolt, setValVolt] = useState([]);
  const [valVibra, setValVibra] = useState([]);

  useEffect(() => {

    (async () => {
      await api.get(`model/${id}`, {headers: {authorization: `Bearer ${accessToken}`}})
        .then((selected) => {
          setModel(selected.data.model)
          setModelOriginal(selected.data.model)

          setValTemp([selected.data.model.min_temp, selected.data.model.max_temp]);
          setValCurrent([selected.data.model.min_current, selected.data.model.max_current]);
          setValVolt([selected.data.model.min_voltage, selected.data.model.max_voltage]);
          setValVibra([selected.data.model.min_vibra, selected.data.model.max_vibra]);
        })
        .catch(err => {
          console.error(err);
        });

      setLoading(false)
    })();
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  // Aqui temos as funcoes para as faixas de valores
  const updateRangeTemp = (e, data) => {
    setValTemp(data)
    setModel({ ...model, min_temp: data[0], max_temp: data[1] })
  };

  const updateRangeCurrent = (e, data) => {
    setValCurrent(data)
    setModel({ ...model, min_current: data[0], max_current: data[1] })
  };

  const updateRangeVolt = (e, data) => {
    setValVolt(data)
    setModel({ ...model, min_voltage: data[0], max_voltage: data[1] })
  };

  const updateRangeVibra = (e, data) => {
    setValVibra(data)
    setModel({ ...model, min_vibra: data[0], max_vibra: data[1] })
  };

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

      const data = {
        modelName: model.modelName,
        type: model.type,
        manufacturer: model.manufacturer,
        releaseYear: model.releaseYear,
        min_temp: model.min_temp,
        max_temp: model.max_temp,
        min_current: model.min_current,
        max_current: model.max_current,
        min_voltage: model.min_voltage,
        max_voltage: model.max_voltage,
        min_vibra: model.min_vibra,
        max_vibra: model.max_vibra,
      }

      sendMessage("Atuaizando os dados...", "info", null);

      api.put(`model/${id}`, data, {headers: {authorization: `Bearer ${accessToken}`}})
        .then(response => {
          sendMessage("Dados alterados com sucesso", "success");
          setModelOriginal(data);
          console.log(data, 'Dados depois de alterar');
        })
        .catch(err => {
          console.log(err);
          sendMessage("Erro ao atualizar modelo!", "error");
        })

      setUpdating(false)
    }
  }

  // Esta funcao vai verificar se existe algum equipamento com o id do modelo em questao
  async function DeleteVerification() {

    await api
      .get("/equipment/index", {headers: {authorization: `Bearer ${accessToken}`}})
      .then((response) => {

        console.log(response);
        if (response.data.equipment.find((equipment) => equipment.id_model === id)) { //se achar algo nao pode excluir
          sendMessage("Não foi possível excluir modelo, ele possui equipamentos vinculados.", "error");
          setDeleting(false);
        } else { // Caso nao tenha nenhuma bomba ligada ao modelo, pode excluir
          handleDelete(true);
        }
      })
      .catch((error) => {
        console.warn(error);
        sendMessage("Erro ao validar remoção de modelo!", "error")
      })
  }

  async function handleDelete(confirmation) {

    if (updating) { //cancelar

      setUpdating(false);
      setModel(modelOriginal);
      setError({
        releaseYear: "",
      })
      setValTemp([modelOriginal.min_temp, modelOriginal.max_temp]);
      setValCurrent([modelOriginal.min_current, modelOriginal.max_current]);
      setValVolt([modelOriginal.min_voltage, modelOriginal.max_voltage]);
      setValVibra([modelOriginal.min_vibra, modelOriginal.max_vibra]);

    } else if (confirmation === true) { // excuir de verdade

      setDeleting(false);
      await api.delete(`model/${id}`, {headers: {authorization: `Bearer ${accessToken}`}}).then((response) => {

        sendMessage("Modelo excluído com sucesso", "success");
        setTimeout(() => {
          history.push("/listagemmodelo");
        }, 1000)

      }).catch((err) => {
        sendMessage("Erro ao excluir modelo!", "error");
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

        <Typography variant="h3" className={classes.title}>
          Detalhes do Modelo
        </Typography>

        <AreYouSure />

        <Paper className={classes.formContainer} elevation={0}>
          <Grid container spacing={isDesktop ? 5 : 0}>
            <Grid item xs={12} md={6}>
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
                disabled={!updating}
              />

              <TextField
                name="type"
                className={classes.input}
                value={model.type}
                onChange={handleChangeInput}
                label="Tipo de equipamento"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
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
                  disabled={!updating}
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
                  disabled={!updating}
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
                  disabled={!updating}
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
                  disabled={!updating}
                  min={0}
                  max={10000}
                  step={500}
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
