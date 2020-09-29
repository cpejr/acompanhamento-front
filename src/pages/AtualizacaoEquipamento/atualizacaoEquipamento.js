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
  Typography
} from "@material-ui/core"
import { useParams } from 'react-router';

import { useStyles } from './atualizacaoEquipamentoStyle'
import { DataContext } from '../../context/DataContext';

function AtualizacaoEquipamento() {
  const { id_equipment } = useParams();
  const { equipmentsList } = useContext(DataContext);

  const [updating, setUpdating] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
      const equipment = equipmentsList.find(equipment => equipment.id_equipment=== id_equipment);
      setEquipmentData(equipment);

  }, [id_equipment, equipmentsList])

  const classes = useStyles({ updating });

  if (!equipmentData) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>
            Detalhes do Equipamento
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
    setEquipmentData({ ...equipmentData, [name]: value });
  }

  function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      console.log(equipmentData)
      alert("Salvando no banco de dados...")
      setUpdating(false)
    }
  }

  function handleDelete(confirmation) {
    if (updating) setUpdating(false) //cancelar
    else if (confirmation === true) { // excuir de verdade
      setDeleting(false);
      alert("Excluindo usuário do banco de dados...")
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
      <DialogTitle>Excluir equipamento?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este equipamento?
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
          Detalhes do Equipamento
        </h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <Grid container >
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                label="Modelo"
                name="model_equipment"
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
                value={equipmentData.model_equipment}
              />
              <TextField
                label="CPF" //Trocar depois:  empresa tem cnpj e pessoa cpf massó vem cpf banco
                name="cpf_client"
                className={classes.input}
                variant="filled"
                disabled //cpf não deve alterar
                onChange={handleChangeInput}
                value={equipmentData.cpf_client}
              />
              <TextField
                label="Número de série"
                name="id_equipment"
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
                value={equipmentData.id_equipment}
              />
              <TextField
                label="Data instalação"
                name="instalation_date"
                type="date"
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
                //value={equipmentData.instalation_date}
                defaultValue="2020-11-10"
              />
            </Grid>


            <Grid className={classes.centralizar} item xs={12}>
              <Button variant="contained" color="primary" className={classes.btn}
                onClick={handleSubmit}
              >
                {updating ? "Salvar" : "Editar"}
              </Button>

                <Button variant="contained" color="secondary" className={classes.btn}
                  onClick={handleDelete}>
                  {updating ? "Cancelar" : "Excluir"}
                </Button>

            </Grid>

          </Grid>
        </Paper>

      </div>
    </React.Fragment >
  );
}


export default AtualizacaoEquipamento;
