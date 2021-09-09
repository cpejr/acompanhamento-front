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
  const classes = useStyles({ updating });

  useEffect(() => {

    (async () => {
      await api.get(`model/${id}`, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((selected) => {
          setModel(selected.data.model)
          setModelOriginal(selected.data.model)
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
      sendMessage('Alguns campos estão vazios', 'error');
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

      api.put(`model/${id}`, data, { headers: { authorization: `Bearer ${accessToken}` } })
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
      .get("/equipment/index", { headers: { authorization: `Bearer ${accessToken}` } })
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

    } else if (confirmation === true) { // excuir 

      setDeleting(false);
      await api.delete(`model/${id}`, { headers: { authorization: `Bearer ${accessToken}` } }).then((response) => {

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
          <Grid container spacing={isDesktop ? 2 : 0} >

            <Grid item xs={12} md={6}>
              <TextField
                disabled={!updating}
                name="modelName"
                className={classes.inputs}
                value={model.modelName}
                onChange={handleChangeInput}
                label="Nome do modelo"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
              />

              <TextField
                disabled={!updating}
                name="type"
                className={classes.inputs}
                value={model.type}
                onChange={handleChangeInput}
                label="Tipo de equipamento"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
              />

              <TextField
                disabled={!updating}
                name="manufacturer"
                className={classes.inputs}
                value={model.manufacturer}
                onChange={handleChangeInput}
                label="Fabricante"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
              />

              <TextField
                disabled={!updating}
                name="releaseYear"
                className={classes.inputs}
                value={model.releaseYear}
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
                  disabled={!updating}
                  className={classes.inputRange}
                  name="min_temp"
                  helperText="mínimo"
                  label="°C"
                  variant="filled"
                  value={model.min_temp}
                  margin="dense"
                  onChange={handleChangeInput}
                  type='number'
                />
                <TextField
                  disabled={!updating}
                  name="max_temp"
                  className={classes.inputRange}
                  helperText="máximo"
                  label="°C"
                  variant="filled"
                  value={model.max_temp}
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
                  disabled={!updating}
                  name="min_current"
                  className={classes.inputRange}
                  helperText="mínimo"
                  label="A"
                  variant="filled"
                  value={model.min_current}
                  margin="dense"
                  onChange={handleChangeInput}
                  type='number'
                />
                <TextField
                  disabled={!updating}
                  name="max_current"
                  className={classes.inputRange}
                  helperText="máximo"
                  label="A"
                  variant="filled"
                  value={model.max_current}
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
                  disabled={!updating}
                  name="min_voltage"
                  className={classes.inputRange}
                  helperText="mínimo"
                  label="V"
                  variant="filled"
                  value={model.min_voltage}
                  margin="dense"
                  onChange={handleChangeInput}
                  type='number'
                />
                <TextField
                  disabled={!updating}
                  name="max_voltage"
                  className={classes.inputRange}
                  helperText="máximo"
                  label="V"
                  variant="filled"
                  value={model.max_voltage}
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
                  disabled={!updating}
                  name="min_vibra"
                  className={classes.inputRange}
                  helperText="mínimo"
                  label="krpm"
                  variant="filled"
                  value={model.min_vibra}
                  margin="dense"
                  onChange={handleChangeInput}
                  type='number'
                />
                <TextField
                  disabled={!updating}
                  name="max_vibra"
                  className={classes.inputRange}
                  helperText="máximo"
                  label="krpm"
                  variant="filled"
                  value={model.max_vibra}
                  margin="dense"
                  onChange={handleChangeInput}
                  type='number'
                />
              </div>
            </Grid>
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
        </Paper>
      </div>
    </React.Fragment >
  );
}

export default AtualizacaoModelo;
