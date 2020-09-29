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
  DialogActions
} from "@material-ui/core"
import { useParams } from 'react-router';

import { useStyles } from './atualizacaoModeloStyle'
import { DataContext } from '../../context/DataContext';

function AtualizacaoModelo() {
  const { id } = useParams();
  const { modelsList } = useContext(DataContext);

  const [updating, setUpdating] = useState(false);
  const [model, setModel] = useState({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const data = modelsList.find(model => model.id === id);
    setModel(data);
  }, [id, modelsList])

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setModel({ ...model, [name]: value });
  }

  function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      console.log(model)
      alert("Salvando no banco de dados...")
      setUpdating(false)
    }
  }

  function handleDelete(confirmation) {
    if (updating) setUpdating(false) //cancelar
    else if (confirmation === true) { // excuir de verdade
      setDeleting(false);
      alert("Excluindo modelo do banco de dados...")
    }
    else { // confirmar exclusão
      setDeleting(true);
    }
  }

  React.useEffect(() => {
    console.debug("Model", model);
  }, [model])

  const classes = useStyles({ updating });

  const AreYouSure = () => (
    <Dialog
      open={deleting}
      onClose={() => setDeleting(false)}
    >
      <DialogTitle>Excluir modelo?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este modelo?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setDeleting(false)}>
          Cancelar
          </Button>
        <Button color="secondary" onClick={() => handleDelete(true)}>
          Excluir
          </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>

        <h1 className={classes.title}>
          Detalhes do Modelo
        </h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <Grid container >
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                label="Nome"
                name="name"
                value={model.name}
                className={classes.input}
                variant="filled"
                disabled
                onChange={handleChangeInput}
              />
              <TextField
                label="CPF" //Trocar depois:  empresa tem cnpj e pessoa cpf massó vem cpf banco
                name="cpf"
                value={model.cpf}
                className={classes.input}
                variant="filled"
                disabled //cpf não deve alterar
                onChange={handleChangeInput}
              />
              <TextField
                label="Função"
                name="funcao"
                value={model.funcao}
                className={classes.input}
                variant="filled"
                disabled //quem pode alterar este dado???
                onChange={handleChangeInput}
              />
              <TextField
                label="Endereço"
                name="adress"
                value={model.adress}
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
              />
            </Grid>
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                label="Telefone"
                name="phone"
                className={classes.input}
                variant="filled"
                value={model.phone}
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                label="Email"
                name="email"
                className={classes.input}
                variant="filled"
                value={model.email}
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                label="Senha"
                name="password"
                className={classes.input}
                variant="filled"
                type="password"
                defaultValue="123456"
                disabled //deve ser tão fácil alterar a senha???
                onChange={handleChangeInput}
              />
              <TextField
                label="Situação"
                name="situacao" // não existe este dado no banco de dados
                className={classes.input}
                variant="filled"
                defaultValue="Bem de saúde"
                disabled={!updating}
                onChange={handleChangeInput}
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
