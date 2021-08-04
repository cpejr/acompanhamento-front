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

import { useParams } from 'react-router';
import { useStyles } from './atualizacaoModeloStyle'
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { AuthContext } from '../../context/AuthContext'

import MaskedInput from 'react-text-mask';

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
  const [updating, setUpdating] = useState(false);
  const [model, setModel] = useState({});
  const [modelOriginal, setModelOriginal] = useState({});
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    releaseYear: '',
  });

  const { sendMessage } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await api.get(`model/${id}`)
        .then((selected) => {
          setModel(selected.data.model)
          setModelOriginal(selected.data.model)
        })
        .catch(err => {
          console.error("Backend is not working properly", err);
        });
      setLoading(false)
    })();
  }, [id])

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
      console.log(model)
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
        })
        .catch(err => {
          console.log(err);
          sendMessage(`Erro: ${err.message}`, "error");
        })
      setUpdating(false)

    }
  }

  //Esta funcao vai verificar se existe algum equipamento com o id do modelo em questao
  function DeleteVerification() {
    const response = await api.get("/equipment/index");
    if (response.data.find((x)=> {if(x.id_model === id) return true})) { //se achar algo nao pode excluir
      alert("Não foi possível excluir modelo, ele possui equipamentos vinculados");
    }
    else {//Caso nao tenha nenhuma bomba ligada ao modelo, pode excluir
      handleDelete(true);
    }
  }

  function handleDelete(confirmation) {
    if (updating) { //cancelar
      setUpdating(false);
      setModel(modelOriginal);
      setError({
        releaseYear: "",
      })
    }
    else if (confirmation === true) { // excuir de verdade
      setDeleting(false);
      alert("Excluindo modelo do banco de dados...")
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
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este modelo? Equipamento que fazem
          uso deste modelo podem ser afetados!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setDeleting(false)}>
          Cancelar
          </Button>
        <Button color="secondary" onClick={() => DeleteVerification()} disabled="false">
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
              {/* <Autocomplete
                value={model.type}
                freeSolo
                className={classes.input}
                options={["Motor", "Bomba hidráulica"]}
                onChange={handleChangeInput}
                disabled={!updating}
                renderInput={params => (
                  <TextField
                    name="type"
                    {...params}
                    label="Tipo de equipamento"
                    type="text"
                    helperText="*Obrigatório"
                    variant="filled"
                    autoComplete="off"
                  />
                )}
              /> */}
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
              <TextField
                name="min_temp"
                className={classes.input}
                value={model.min_temp}
                onChange={handleChangeInput}
                label="Limite minimo de temperatura"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="max_temp"
                className={classes.input}
                value={model.max_temp}
                onChange={handleChangeInput}
                label="Limite maximo de temperatura"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="min_current"
                className={classes.input}
                value={model.min_current}
                onChange={handleChangeInput}
                label="Limite minimo de corrente"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="max_current"
                className={classes.input}
                value={model.max_current}
                onChange={handleChangeInput}
                label="Limite maximo de corrente"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="min_voltage"
                className={classes.input}
                value={model.min_voltage}
                onChange={handleChangeInput}
                label="Limite minimo de tensão"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="max_voltage"
                className={classes.input}
                value={model.max_voltage}
                onChange={handleChangeInput}
                label="Limite maximo de tensão"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="min_vibra"
                className={classes.input}
                value={model.min_vibra}
                onChange={handleChangeInput}
                label="Limite minimo de vibração"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
              <TextField
                name="max_vibra"
                className={classes.input}
                value={model.max_vibra}
                onChange={handleChangeInput}
                label="Limite maximo de vibração"
                type="number"
                helperText="*Obrigatório"
                variant="filled"
                autoComplete="off"
                disabled={!updating}
              />
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




// array=[1,2,3,4,5];

// const numero = array.find((x)=> {
//   if (x===3) return x
// })