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
  useMediaQuery,
} from "@material-ui/core"
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router';
import { useStyles } from './atualizacaoModeloStyle'
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { AuthContext } from '../../context/AuthContext'
import { LoginContext } from '../../context/LoginContext';
import { TrendingUpRounded } from '@material-ui/icons';

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

  // vetores de estados
  const [valTemp, setValTemp] = useState([]);
  const [valCurrent, setValCurrent] = useState([]);
  const [valVolt, setValVolt] = useState([]);
  const [valVibra, setValVibra] = useState([]);

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


  const classes = useStyles({ updating });
 
    // Aqui temos as funcoes que escutam os valores digitados nos inputs e os definem no Model
    // Raphael, aqui pode ser que não tenha ficado o mais otimizado possível, caso não esteja adequado, favor me informar
    const updateMinTemp = (e) => {
     
      valTemp[0] = minTemp;
      setMinTemp(e.target.value);      
      setModel({ ...model, min_temp: e.target.value});
    };
    const updateMaxTemp = (e) => {
     
      valTemp[1] = maxTemp;
      setMaxTemp(e.target.value);
      setModel({ ...model, max_temp: e.target.value});
    };
    const updateMinCurrent = (e) => {

      valCurrent[0] = minCurrent;
      setMinCurrent(e.target.value);
      setModel({ ...model, min_current: e.target.value});
    }
    const updateMaxCurrent = (e) => {

      valCurrent[1] = maxCurrent;
      setMaxCurrent(e.target.value);
      setModel({ ...model, max_current: e.target.value});
    }
    const updateMinVolt = (e) => {

      valVolt[0] = minVolt;
      setMinVolt(e.target.value);
      setModel({ ...model, min_voltage: e.target.value});
    }
    const updateMaxVolt = (e) => {

      valVolt[1] = maxVolt;
      setMaxVolt(e.target.value);
      setModel({ ...model, max_voltage: e.target.value});
    }
    const updateMinVibra = (e) => {

      valVibra[0] = minVibra;
      setMinVibra(e.target.value);
      setModel({ ...model, min_vibra: e.target.value});
    }
    const updateMaxVibra = (e) => {

      valVibra[1] = maxVibra;
      setMaxVibra(e.target.value);
      setModel({ ...model, max_vibra: e.target.value});
    }
    
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

    } else if (confirmation === true) { // excuir 

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
                {/* As divs foram criadas dessa forma para possibilitar o alinhamento dos inputs */}
                <div style={{display: "flex", flexDirection: "row"}}>
                  <div style={{marginRight: "50px"}}>
                    <TextField
                      className={classes.inputRange}
                      disabled={!updating}
                      helperText= "mínimo"
                      label = "°C"
                      variant="filled"
                      value={minTemp}
                      margin="dense"
                      defaultValue={valTemp[0]}
                      onChange={updateMinTemp} // input min
                      inputProps = {{step:1, min: 0, max: 100}} // permite dispensar os marcadores - linha 27 ...
                      type = 'number' 
                    />  
                  </div>
                  <div>
                    <TextField
                      className={classes.inputRange}
                      disabled={!updating}
                      helperText= "máximo"
                      label = "°C"
                      variant="filled"
                      value={maxTemp}
                      margin="dense"
                      defaultValue={valTemp[1]}
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
                      disabled={!updating}
                      helperText= "mínimo"
                      label = "A"
                      variant="filled"
                      value={minCurrent}
                      margin="dense"
                      defaultValue={valCurrent[0]}
                      onChange={updateMinCurrent} // input min
                      inputProps = {{step:1, min: 0, max: 100}}
                      type = 'number' 
                     /> 
                  </div> 
                  <div>
                    <TextField
                      className={classes.inputRange}
                      disabled={!updating}
                      helperText= "máximo"
                      label = "A"
                      variant="filled"
                      value={maxCurrent}
                      margin="dense"
                      defaultValue={valCurrent[1]}
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
                      disabled={!updating}
                      helperText= "mínimo"
                      label = "V"
                      variant="filled"
                      value={minVolt}
                      margin="dense"
                      defaultValue={valVolt[0]}
                      onChange={updateMinVolt} // input min
                      inputProps = {{step:1, min: 0, max: 100}}
                      type = 'number' 
                      />
                  </div>
                  <div>
                    <TextField
                      className={classes.inputRange}
                      disabled={!updating}
                      helperText= "máximo"
                      label = "V"
                      variant="filled"
                      value={maxVolt}
                      margin="dense"
                      defaultValue={valVolt[1]}
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
                      disabled={!updating}
                      helperText= "mínimo"
                      label = "Krpm"
                      variant="filled"
                      value={minVibra}
                      margin="dense"
                      defaultValue={valVibra[0]}
                      onChange={updateMinVibra} // input min
                      inputProps = {{step:1, min: 0, max: 10000}}
                      type = 'number' 
                      />
                  </div>
                  <div>  
                    <TextField
                      className={classes.inputRange}
                      disabled={!updating}
                      helperText= "máximo"
                      label = "Krpm"
                      variant="filled"
                      value={maxVibra}
                      margin="dense"
                      defaultValue={valVibra[1]}
                      onChange={updateMaxVibra} // input max
                      inputProps = {{step:1, min: 0, max: 10000}}                  
                      type = 'number'
                      />
                  </div>
                </div>
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
