import React, { useState, useEffect, useContext } from "react";
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
import { RssFeed } from "@material-ui/icons";
import { useHistory } from 'react-router-dom';

function AtualizacaoUsuario(props) {
  const { id } = useParams();
  const history = useHistory();

  const [updating, setUpdating] = useState(false);
  const [userData, setUserData] = useState({});
  const [userDataOriginal, setUserDataOriginal] = useState({});
  const [deleting, setDeleting] = useState(false);

  // variaveis do snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("info");
  const [loading, setLoading] = useState(false);

  const classes = useStyles({ updating });

  useEffect(() => {
    if (id === "me") {
      setUserData(props.userPerfil);
      setUserDataOriginal(props.userPerfil);
    } else {
      api
        .get(`/user/${props.userPerfil.id}`)
        .then((response) => {
          setUserData(response.data.user);
          setUserDataOriginal(response.data.user);
        })
        .catch((error) => {
          console.warn(error);
          alert("Erro ao buscar funcionários");
        });
    }
  }, [id, props.userPerfil]);

  // pega os dados do usuário com o id

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
          birthdate: userData.birthdate,
          phonenumber: userData.phonenumber,
          address: userData.address,
          zipcode: userData.zipcode,
        };

        if (
          updatedFields.name !== "" &&
          updatedFields.birthdate !== "" &&
          updatedFields.phonenumber !== "" &&
          updatedFields.address !== "" &&
          updatedFields.zipcode !== ""
        ) {
          const response = await api.put(`/user/${id}`, updatedFields);

          setOpenSnackbar(true);
          setMessageSnackbar("Usuário atualizado com sucesso!");
          setTypeSnackbar("success");

          setUpdating(false);
        } else {
          setOpenSnackbar(true);
          setMessageSnackbar("Dados não permitidos! Tente novamente.");
          setTypeSnackbar("error");
        }
      } catch (error) {
        console.log(error);

        setOpenSnackbar(true);
        setMessageSnackbar("Falha ao atualizar usuário.");
        setTypeSnackbar("error");

        setUpdating(false);
      }

      setLoading(false);
    }
  }

  async function handleDelete(confirmation) {
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

        console.log(response);

        setOpenSnackbar(true);
        setMessageSnackbar("Usuário deletado com sucesso!");
        setTypeSnackbar("success");

        setUpdating(false);

        setTimeout(() => {
          history.push("/listagemusuario");
        }, 1000)
        
      } catch (error) {
        console.log(error);

        setOpenSnackbar(true);
        setMessageSnackbar("Falha ao deletar usuário.");
        setTypeSnackbar("error");

        setUpdating(false);
      }

    }
  }

  // ---------------------------- //

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
          {userData.type === "PF" && id === "me" ? (
            <CadastroPF
              formData={userData}
              handleChangeInput={handleChangeInput}
              mode={updating ? "edit" : "view"}
            />
          ) : userData.type === "PJ" && id === "me" ? (
            <CadastroPJ
              formData={userData}
              handleChangeInput={handleChangeInput}
              mode={updating ? "edit" : "view"}
            />
          ) : userData.type === "Funcionario" ||
            userData.type === "Administrador" ? (
            <CadastroFuncionario
              formData={userData}
              handleChangeInput={handleChangeInput}
              mode={updating ? "edit" : "view"}
            />
          ) : null}

          <Grid className={classes.centralizar} item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              onClick={handleSubmit}
            >
              {updating ? (
                "Salvar"
              ) : loading ? (
                <CircularProgress color="secondary" />
              ) : (
                "Editar"
              )}
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
        autoHideDuration={typeSnackbar === 'info' ? 20000 : 2000}
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
