import React from 'react';
import { Link } from 'react-router-dom';
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

export default function EsqueciSenha() {
  const classes = useStyles();

  const [error, setError] = React.useState("");
  const [firstSubmit, setFirstSubmit] = React.useState(false);
  const [openMensage, setOpenMensage] = React.useState(false);

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(false);
  }

  const handleSubmit = () => {
    const email = document.getElementById("email").value;
    setError("");
    // enviei para o backend e espero uma resposta para
    // se conseguir enviar codigo:
    if (email === "email@teste.com") {
      setOpenMensage(true);
      setFirstSubmit(true);
    }

    // se não conseguir enviar codigo:
    else
      switch (email) {
        case "":
          setError("Insira seu email");
          break;
        default:
          setError("Email inválido");
          break;
      }
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.esquecisenhaLogo}></div>

        <Snackbar autoHideDuration={6000} open={openMensage} onClose={handleCloseMensage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert elevation={6} variant="filled" severity="success">
            Código enviado para o seu email
          </Alert>
        </Snackbar>

        <div className={classes.esquecisenhaForm}>
          <Typography className={classes.title}>Esqueci minha senha!</Typography>
          <TextField className={classes.email}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <FiMail size={24} className={classes.icon
                } />
              </InputAdornment>,
            }}
            autoComplete={false}
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
              Não recebeu o email? <Link onClick={handleSubmit}>Enviar novamente</Link>
            </p> :
            <Button className={classes.buttonCodigo} onClick={handleSubmit}>
              Enviar Código
            </Button>}
        </div>
      </div>

    </React.Fragment >

  );
}
