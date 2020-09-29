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
import equipaments from '../../services/data'
import { AuthContext } from '../../context/AuthContext';

function AtualizacaoEquipamento() {
  const { id_equipament } = useParams();
  const { equipment} = useContext(AuthContext);

  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id_equipament === "me") {
      setUserData(equipment);
    } else {
      const equipment = user.data.find(equipment => equipment.id_equipament=== id_equipament);
      setUserData(equipment);
    }
  }, [id_equipament, equipment])

  const classes = useStyles({ updating });

  // if (!userData) {
  //   return (
  //     <React.Fragment>
  //       <CssBaseline />
  //       <div className={classes.root}>
  //         <h1 className={classes.title}>
  //           Detalhes do Equipamento
  //         </h1>
  //         <Paper className={classes.containerForm} elevation={0}>
  //           <Typography variant="h5">Dados inválidos!</Typography>
  //         </Paper>
  //       </div>
  //     </React.Fragment>
  //   );
  // }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      console.log(userData)
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
          {id_equipament === "me" ? "Seu Perfil" : "Detalhes do Equipamento"}
        </h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <Grid container >
            <Grid item xs={12} md={6} className={classes.grid}>
              <TextField
                label="Modelo"
                name="model"
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                label="CPF" //Trocar depois:  empresa tem cnpj e pessoa cpf massó vem cpf banco
                name="cpf"
                className={classes.input}
                variant="filled"
                disabled //cpf não deve alterar
                onChange={handleChangeInput}
              />
              <TextField
                label="Número de série"
                name="numeroserie"
                className={classes.input}
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
              />
              <TextField
                label="Data instalação"
                name="date"
                type="date"
                defaultValue="2020-09-22"
                className={classes.input}
                variant="filled"
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

<<<<<<< Updated upstream
              <Button variant="contained" color="secondary" className={classes.btn}
                onClick={handleDelete}
                disabled={id === "me" && !updating}
              >
                {updating ? "Cancelar" : "Excluir"}
              </Button>
=======
                <Button variant="contained" color="secondary" className={classes.btn}
                  onClick={handleDelete}
                    disabled={id_equipament==="me" &&! updating}
                >
                  {updating ? "Cancelar" : "Excluir"}
                </Button>
>>>>>>> Stashed changes
            </Grid>

          </Grid>
        </Paper>

      </div>
    </React.Fragment >
  );
}


export default AtualizacaoEquipamento;
