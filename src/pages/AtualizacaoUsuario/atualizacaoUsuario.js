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

import { useStyles } from './atualizacaoUsuarioStyle'
import users from '../../services/people'
import { AuthContext } from '../../context/AuthContext';
import CadastroPF from "../CadastroUsuario/cadastroPF";
import CadastroFuncionario from "../CadastroUsuario/cadastroFuncionario";
import CadastroPJ from "../CadastroUsuario/cadastroPJ";

function AtualizacaoUsuario() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataOriginal, setUserDataOriginal] = useState({});
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id === "me") {
      setUserData(user);
      setUserDataOriginal(user)
    } else {
      const user = users.people.find(user => user.id === id);
      setUserData(user);
      setUserDataOriginal(user);
    }
  }, [id, user])

  const classes = useStyles({ updating });

  if (!userData) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>
            Detalhes de Usuário
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
    setUserData({ ...userData, [name]: value });
  }

  function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      console.log(userData)
      alert("Salvando no banco de dados...")
      setUserDataOriginal(userData);
      setUpdating(false)
    }
  }

  function handleDelete(confirmation) {
    if (updating) { //cancelar
      setUpdating(false);
      setUserData(userDataOriginal);
    }
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
      <DialogTitle>Excluir usuário?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este usuário?
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
          {id === "me" ? "Seu Perfil" : "Detalhes do Usuário"}
        </h1>

        <AreYouSure />
        <Paper className={classes.containerForm} elevation={0}>
          {(userData.funcao === "Cliente" && userData.cpf) || id === "me"  ? //TODO alterar
            <CadastroPF
              formData={userData}
              handleChangeInput={handleChangeInput}
              mode={ updating? 'edit':'view'}
            />
            :
            (userData.funcao === "Cliente" && userData.cnpj ?
              
            <CadastroPJ
                formData={userData}
                handleChangeInput={handleChangeInput}
                mode={ updating? 'edit':'view'}
              />
              :
                (userData.funcao === "Funcionário" || userData.funcao === "Administrador" ?
                    <CadastroFuncionario
                      formData={userData}
                      handleChangeInput={handleChangeInput}
                      mode={ updating? 'edit':'view'}
                    />
                    :
                    null
                )
            )
          }
        
          <Grid className={classes.centralizar} item xs={12}>
            <Button variant="contained" color="primary" className={classes.btn}
              onClick={handleSubmit}
            >
              {updating ? "Salvar" : "Editar"}
            </Button>
      
            {!(id === "me" && updating === false) &&
              <Button variant="contained" color="secondary" className={classes.btn}
                onClick={handleDelete}
              >
                {updating ? "Cancelar" : "Excluir"}
              </Button>
            }
          </Grid>
        </Paper>

      </div>
    </React.Fragment >
  );
}

export default AtualizacaoUsuario;
