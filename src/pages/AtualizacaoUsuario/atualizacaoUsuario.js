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
import { AuthContext } from "../../context/AuthContext";
import CadastroPF from "../CadastroUsuario/cadastroPF";
import CadastroFuncionario from "../CadastroUsuario/cadastroFuncionario";
import CadastroPJ from "../CadastroUsuario/cadastroPJ";
import api from "../../services/api";
import isValidDate from "../../services/dateValidation";
import { useHistory, Link } from "react-router-dom";

function AtualizacaoUsuario(props) {

  let { id } = useParams();
  const history = useHistory();
  const { sendMessage } = useContext(AuthContext);

  // states
  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataOriginal, setUserDataOriginal] = useState({});
  const [deleting, setDeleting] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isPerfil, setIsPerfil] = useState(false);

  // variaveis do snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("info");

  const classes = useStyles({ updating });

  // pega os dados do usuário com o id
  useEffect(() => {

    if (id === "me") {
      // clicou no botão de perfil
      setIsPerfil(true);
      setUserData({ 
        ...props.userPerfil, 
        emailConfirm: props.userPerfil.email 
      });

      setUserDataOriginal({
        ...props.userPerfil, 
        emailConfirm: props.userPerfil.email
      })

    } else {
      api
        .get(`/user/${id}`)
        .then((response) => {
          setUserData(response.data.user);
          setUserDataOriginal(response.data.user);
        })
        .catch((error) => {
          console.warn(error);
          sendMessage("Erro ao atualizar email e senha", "error");
        });
    }
  }, [id]);

  function validateAllFields(data) {

    if (
      data.name !== "" &&
      data.phonenumber !== "" &&
      data.birthdate !== "" &&
      data.phonenumber.length >= 8 &&
      isValidDate(data.birthdate)
    ) {
      return true;
    } else return false;
  }

  function validateEmailAndPassword(data) {

    if (!data.password || !data.email) {
      return false;
    }

    if (
      data.email !== "" &&
      data.email.includes("@") &&
      data.email.includes(".com") &&
      data.password !== "" &&
      data.password.length >= 8 &&
      data.email === data.emailConfirm &&
      data.password === data.passwordConfirm
    ) {
      return true;
    } else return false;
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  }

  async function handleSubmit() {

    if (updatingPassword) {
      try {

        const updatedFields = {
          password: userData.password,
          passwordConfirm: userData.passwordConfirm,
          email: userData.email,
          emailConfirm: userData.emailConfirm,
        };

        const updatedEmail = {
          email: userData.email
        }

        if (validateEmailAndPassword(updatedFields)) {

          await api
            .put(`/user/${props.userPerfil.id}`, updatedEmail)
            .then((response) => {
            })
            .catch((error) => {
              console.warn(error);
              sendMessage("Erro ao salvar novo email no banco de dados!", "error");
            });
          
          await api
            .put(`/user/updateFirebase/${props.userPerfil.firebaseUid}`, updatedFields)
            .then((response) => {
              sendMessage("Senha e email atualizados com sucesso!", "success");
            })
            .catch((error) => {
              console.warn(error);
              sendMessage("Erro ao atualizar senha e/ou email", "error");
            });

        } else {

            const passwordSize = updatedFields.password 
              ? updatedFields.password.length
              : 0;

            if (updatedFields.email === "" && !updatedFields.email.includes("@") && !updatedFields.email.includes(".com")) 
              sendMessage("Email inválido.", "error");
            else if (passwordSize < 8) 
              sendMessage("Senha deve conter no mínimo 8 caracteres.", "error");
            else if (updatedFields.emailConfirm !== updatedFields.email) 
              sendMessage("Os emails estão diferentes!", "error");
            else if (updatedFields.passwordConfirm !== updatedFields.password) 
              sendMessage("As senhas estão diferentes!", "error");
            else sendMessage("Dados inválidos!", "error");

            setLoading(false);
          }
      } catch (error) {
        console.log(error);

        sendMessage("Falha ao atualizar senha e/ou email", "error");
        setUpdating(false);
      }

      return;
    }

    if (!updating) setUpdating(true);
    else {
      setLoading(true);

      try {
        const updatedFields = {
          name: userData.name,
          birthdate: userData.type === "PJ" ? "01/01/1901" : userData.birthdate,
          phonenumber: userData.phonenumber,
          password: userData.password,
        };

        if (validateAllFields(updatedFields)) {

          if (isPerfil) {
            id = props.userPerfil.id;
          }

          api
            .put(`/user/${id}`, updatedFields)
            .then((response) => {
              sendMessage("Usuário atualizado com sucesso!", "success");
            })
            .catch((error) => {
              console.warn(error);
              sendMessage("Erro ao atualizar usuário!", "error");
            });

          setUpdating(false);
          setLoading(false);
        } else {

          // mensagens (snackbar) de erros
          if (updatedFields.phonenumber.length < 8)
            sendMessage("Telefone inválido.", "error");
          else if (!isValidDate(updatedFields.birthdate))
            sendMessage("Data de nascimento inválida!", "error");
          else if (updatedFields.name === "") 
            sendMessage("Nome inválido!", "error");
          else sendMessage("Campos com dados inválidos!", "error");

          setLoading(false);
        }
      } catch (error) {
        console.log(error);

        sendMessage("Falha ao atualizar usuário", "error");
        setUpdating(false);
      }
    }
  }

  async function handlePasswordChange() {
    setUpdatingPassword(true);
    setUpdating(true);

    setLoading(false);
  }

  async function handleDelete(confirmation) {
    if (updatingPassword) {
      setUpdatingPassword(false);
    }
    if (updating) {
      //cancelar
      setUpdating(false);
      setUserData(userDataOriginal);
    } else {
      // excuir de verdade
      setOpenSnackbar(true);
      setMessageSnackbar("Excluindo usuário...");
      setTypeSnackbar("info");

      try {
        const response = await api.delete(`user/${id}`);

        setOpenSnackbar(true);
        setMessageSnackbar("Usuário deletado com sucesso!");
        setTypeSnackbar("success");

        setUpdating(false);

        setTimeout(() => {
          history.push("/listagemusuario");
        }, 1000);
      } catch (error) {
        console.log(error);

        setOpenSnackbar(true);
        setMessageSnackbar("Falha ao deletar usuário.");
        setTypeSnackbar("error");

        setUpdating(false);
      }
    }
  }

  if (!userData) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>Detalhes de Usuário</h1>
          <Paper className={classes.containerForm} elevation={0}>
            <Typography variant="h5"> Dados inválidos!</Typography>
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
          {userData.type === "PF" || id === "me" ? (
            <CadastroPF
              formData={userData}
              handleChangeInput={handleChangeInput}
              mode={
                updatingPassword ? "updatepassword" : updating ? "edit" : "view"
              }
            />
          ) : userData.type === "PJ" ? (
            <CadastroPJ
                formData={userData}
                handleChangeInput={handleChangeInput}
                mode={ updating? 'edit' : 'view'}
              /> )
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
            
          }
          <div className={classes.buttonContainer} >
            <Button
              component={Link}
              to={`/listagemequipamento?userid=${props.userPerfil.id}`}
              variant="outlined"
              disableElevation
              className={classes.buttonAdd}
            >
              Acessar equipamentos
            </Button>
          </div>
          <Grid className={classes.centralizar} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleSubmit}
            >
              {updating ? (
                loading ? (
                  <CircularProgress color="primary" />
                ) : (
                  "Salvar"
                )
              ) : (
                "Editar"
              )}
            </Button>

            
            {isPerfil && !updating && (
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handlePasswordChange}
                disabled={!isPerfil}
              >
                {updating ? (
                  loading ? (
                    <CircularProgress color="primary" />
                  ) : (
                    "Salvar"
                  )
                ) : (
                  "Atualizar email e senha"
                )}
              </Button>
            )}

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
        autoHideDuration={typeSnackbar === "info" ? 20000 : 2000}
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
