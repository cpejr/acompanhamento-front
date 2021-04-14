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
  useRadioGroup
} from "@material-ui/core"
import { useParams } from 'react-router';

import { useStyles } from './atualizacaoUsuarioStyle'
import users from '../../services/people'
import { AuthContext } from '../../context/AuthContext';
import CadastroPF from "../CadastroUsuario/cadastroPF";
import CadastroFuncionario from "../CadastroUsuario/cadastroFuncionario";
import CadastroPJ from "../CadastroUsuario/cadastroPJ";
import api from "../../services/api";
import { RssFeed } from '@material-ui/icons';


function AtualizacaoUsuario() {

  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataOriginal, setUserDataOriginal] = useState({});
  const [deleting, setDeleting] = useState(false);

  const classes = useStyles({ updating });

  // useEffect(() => {
  //   if (id === "me") {
  //     setUserData(user);
  //     setUserDataOriginal(user)
  //   } else {
  //     const user = users.people.find(user => user.id === id);
  //     setUserData(user);
  //     setUserDataOriginal(user);
  //   }
  // }, [id, user])

  // pega os dados do usuário com o id
  useEffect(() => getUserData(), [id]);

  async function getUserData() {
    try {
      const response = await api.get(`/users/${id}`);

      setUserData(response.data.user);
      setUserDataOriginal(response.data.user);
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar funcionários");
    }
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit() {
    if (!updating) setUpdating(true)
    else {
      try {
        const updatedFields = {
          name: userData.name,
          birthdate: userData.birthdate,
          phonenumber: userData.phonenumber,
          address: userData.address,
          zipcode: userData.zipcode,
        }

        const response = await api.put(`/users/${id}`, updatedFields);
        console.log(response)
      } catch (error) {
        console.log(error);
        alert("Erro ao atualizar funcionários");
      }
      
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

  // ---------------------------- // 

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
          { userData.type === 'PF' || id === "me"  ? 
              <CadastroPF
                formData={userData}
                handleChangeInput={handleChangeInput}
                mode={ updating ? 'edit' : 'view'}
              />
              :
              (userData.funcao === "Cliente" && userData.cnpj ?
                
              <CadastroPJ
                  formData={userData}
                  handleChangeInput={handleChangeInput}
                  mode={ updating? 'edit' : 'view'}
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
