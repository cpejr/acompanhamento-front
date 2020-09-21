import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiAlertTriangle } from "react-icons/fi";
import {
  TextField,
  CssBaseline,
  Typography,
  OutlinedInput,
  Button,
  InputAdornment,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from './definicaoNovaSenhaStyle';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import history from '../../history';

export default function DefinicaoNovaSenha() {
  const classes = useStyles();

  const [error1, setError1] = React.useState("");
  const [error2, setError2] = React.useState("");
  const [openMensage, setOpenMensage] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(false);
  }

  const handleSubmit = () => {
    const senha = document.getElementById("senha").value;
    const senhaConfirmar = document.getElementById("senhaConfirmar").value;
    setError1("");
    setError2("");
    console.log(`senha: ${senha} senhaConfirmar: ${senhaConfirmar}`);
    if (senha.length > 4) {
      if (senha === senhaConfirmar) {
        setOpenMensage(true);
        setTimeout(() => {
          history.push('/login');
        }, 5000);
      }
      else { setError2("Senhas diferentes"); }
    }
    else { setError1("Senha curta"); }
    // enviei para o backend e espero uma resposta para
    // se conseguir enviar codigo:
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };



  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Link to="/" className={classes.loginLogo}></Link>

        <Snackbar autoHideDuration={5000} open={openMensage} onClose={handleCloseMensage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert elevation={6} variant="filled" severity="success">
            A senha foi redefinida com sucesso!
          </Alert>
        </Snackbar>

        <div className={classes.definiçaosenhaForm}>
          <Typography className={classes.title}>Definição de Nova Senha</Typography>

          <OutlinedInput className={classes.input}
            type={showPassword ? 'text' : 'password'}
            id="senha"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
            error={!!error1}
          />
          {!!error1 && <>
            <p className={classes.errorText}>
              <FiAlertTriangle /> {error1}
            </p>
          </>}

          <OutlinedInput className={classes.input}
            id="senhaConfirmar"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
            error={!!error2}
          />
          {!!error2 && <>
            <p className={classes.errorText}>
              <FiAlertTriangle /> {error2}
            </p>
          </>}

          <Button className={classes.buttonDefiniçao} onClick={handleSubmit} disabled={openMensage}>
            Confirmar nova senha
            </Button>
        </div>
      </div>
    </React.Fragment >

  );
}
