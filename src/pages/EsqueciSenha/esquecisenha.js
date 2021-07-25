import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiMail, FiAlertTriangle } from "react-icons/fi"
import {
  TextField,
  CssBaseline,
  Typography,
  Button,
  InputAdornment,
  Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'
import { useStyles } from './esquecisenhastyle'
import { AuthContext } from "../../context/AuthContext";

export default function EsqueciSenha() {
  const classes = useStyles();
  const history = useHistory();
  const { sendMessage } = useContext(AuthContext);

  const [error, setError] = React.useState("");
  const [firstSubmit, setFirstSubmit] = React.useState(false);
  const [openMensage, setOpenMensage] = React.useState(false);
  const [openMessageError, setOpenMessageError] = React.useState(false);

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(false);
  }

  const handleCloseMessageError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessageError(false);
  }

  const handleSubmit = async (event) => {

    event.preventDefault(); //cancela os eventos padroes de um submit
    const email = document.getElementById("email").value;

    if (!email) {
      return setError("Insira seu email");
    }

    if (!email.toString().toLowerCase().includes("@")) {
      return setError("Insira um email válido");
    }

    await api.post('/reset', { email: email })
      .then(response => {
        console.log(response);
        sendMessage("Código enviado para o seu email", "success")
      })
      .catch((error)=>{
        console.log(error);
        sendMessage(
          "Erro ao enviar email: certifique-se que o email já é cadastrado no sistema.",
          "error"
        );
      })
      
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Link to="/" className={classes.logo}></Link>

        <form className={classes.esquecisenhaForm} onSubmit={handleSubmit} >
          <Typography className={classes.title}>Esqueci minha senha!</Typography>
          <h4 style={{ color: "white", margin: "0" }}>Email</h4>
          <TextField className={classes.email}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <FiMail size={24} className={classes.icon} />
              </InputAdornment>,
            }}
            type="email"
            variant="outlined"
            id="email"
            error={!!error}
          />
          {!!error && <>
            <p className={classes.errorText}>
              <FiAlertTriangle /> {error}
            </p>
          </>}
          {firstSubmit ?
            <p className={classes.resubmitText}>
              Não recebeu o email? <Button type="submit">Enviar novamente</Button>
            </p> :
            <Button className={classes.buttonCodigo} type="submit">
              Enviar Link de Redefinição
            </Button>}
        </form>
      </div>

    </React.Fragment >

  );
}
