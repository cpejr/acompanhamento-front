import React, { useState, useEffect, useContext } from "react";
import {
  CssBaseline,
  Paper,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Snackbar,
  CircularProgress,
} from "@material-ui/core";
import { useParams } from "react-router";
import MuiAlert from "@material-ui/lab/Alert";

import { useStyles } from "./atualizacaoUsuarioStyle";
import users from "../../services/people";
import { AuthContext } from "../../context/AuthContext";
import { LoginContext } from "../../context/LoginContext";
import CadastroPF from "../CadastroUsuario/cadastroPF";
import CadastroFuncionario from "../CadastroUsuario/cadastroFuncionario";
import CadastroPJ from "../CadastroUsuario/cadastroPJ";
import api from "../../services/api";
import isValidDate from '../../services/dateValidation';
import { RssFeed } from "@material-ui/icons";

function AtualizacaoUsuario(props) {
  const { id } = useParams();

  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataOriginal, setUserDataOriginal] = useState({});
  const [deleting, setDeleting] = useState(false);
  const { sendMessage } = useContext(AuthContext);

  // variaveis do snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("info");
  const [loading, setLoading] = useState(false);

  const classes = useStyles({ updating });

  // pega os dados do usuário com o id
  useEffect(() => {
    api
     .get(`/user/${id}`)
     .then((response) => {
       setUserData(response.data.user);
       setUserDataOriginal(response.data.user);
     })
     .catch((error) => {
       console.warn(error);
       alert("Erro ao buscar funcionários");
     })
 }, [id]);

  function validateAllFields(data) {

    if (
      data.name        !== "" &&
      data.phonenumber !== "" && data.phonenumber.length >= 8 && 
      data.address     !== "" &&
      data.zipcode     !== "" && data.zipcode.length >= 8 &&
      isValidDate(data.birthdate)
    ) return true;

    else return false;
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit() {

    if (!updating) setUpdating(true);
    else {
      setLoading(true);

      try {
        const updatedFields = {
          name: userData.name,
          birthdate: userData.type === 'PJ' ? "01/01/1901" : userData.birthdate,
          phonenumber: userData.phonenumber,
          address: userData.address,
          zipcode: userData.zipcode,
        }

        if (validateAllFields(updatedFields)) {

          api
            .put(`/user/${id}`, updatedFields)
            .then((response) => {
              sendMessage("Usuário atualizado com sucesso!", "success");
            })
            .catch((error) => {
              console.warn(error);
              alert("Erro ao buscar funcionários");
            })

          setUpdating(false);
        } else { // mensagens (snackbar) de erros
          if      (updatedFields.zipcode.length < 8) sendMessage("CEP inválido.", "error");
          else if (updatedFields.phonenumber.length < 8) sendMessage("Telefone inválido.", "error");
          else if (!isValidDate(updatedFields.birthdate)) sendMessage("Data de nascimento inválida!", "error")
    
          else sendMessage('Campos com dados inválidos!', 'error');
        }
        
      } catch (error) {
        console.log(error);

        sendMessage("Falha ao atualizar usuário", "error");
        setUpdating(false);
      }
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

  if (!userData) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>Detalhes de Usuário</h1>
          <Paper className={classes.containerForm} elevation={0}>
            <Typography variant="h5">Dados inválidos!</Typography>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  const AreYouSure = () => (
    <Dialog open={deleting} onClose={() => setDeleting(false)}>
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
            (userData.type === 'PJ' ?
              
            <CadastroPJ
                formData={userData}
                handleChangeInput={handleChangeInput}
                mode={ updating? 'edit' : 'view'}
              />
              :
                (userData.type === "Funcionario" || userData.type === "Administrador" ?
                    <CadastroFuncionario
                      formData={userData}
                      handleChangeInput={handleChangeInput}
                      mode={ updating? 'edit' : 'view'}
                    /> 
                    :
                    null
                )
            )
          }

          <Grid className={classes.centralizar} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleSubmit}
            >
              {
                updating ? 
                  (loading ? (
                    <CircularProgress color="primary" />
                  )
                    : "Salvar")
                  : "Editar"
              }
            </Button>

            {!(id === "me" && updating === false) && (
              <Button
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={handleDelete}
              >
                {updating ? "Cancelar" : "Excluir"}
              </Button>
            )}
          </Grid>
        </Paper>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <MuiAlert
          onClose={() => setOpenSnackbar(false)}
          elevation={6}
          variant="filled"
          severity={typeSnackbar}
        >
          {messageSnackbar}
        </MuiAlert>
      </Snackbar>
    </React.Fragment>
  );
}

export default AtualizacaoUsuario;
