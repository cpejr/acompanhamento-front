import React from 'react';
import { Link } from 'react-router-dom';
import { FiLock, FiAlertTriangle } from "react-icons/fi";
import {
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

  const [error, setError] = React.useState({ error1: "", error2: "" });
  const [success, setOpenMessage] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState({ pass: false, passConfirm: false });

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMessage(false);
  }

  const errorAnalise = (senha, senhaConfirmar) => {
    setError(() => ({ error1: "", error2: "" }));
    // console.log(`senha: ${senha} senhaConfirmar: ${senhaConfirmar}`);

    if (senha.length >= 4) {
      if (senha === senhaConfirmar) {
        setOpenMessage(true);
      }
      else setError(prev => ({ ...prev, error2: "Senhas diferentes" }));
    }
    else if (senha === '') setError(prev => ({ ...prev, error1: "Insira uma senha" }));
    else setError(prev => ({ ...prev, error1: "Senha curta" }));
    // enviei para o backend e espero uma resposta para
    // se conseguir enviar codigo:
  }

  const handleSubmit = (event) => {
    event.preventDefault(); //bloqueia eventos padrões do submit

    if (success) history.push('/login');
    const senha = document.getElementById("senha").value;
    const senhaConfirmar = document.getElementById("senhaConfirmar").value;

    errorAnalise(senha, senhaConfirmar);
  }

  const handleClickShowPassword = (who) => {
    setShowPassword(prev => ({ ...prev, [who]: !prev[who] }));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Link to="/" className={classes.logo}></Link>

        {/* autoHideDuration={5000} */}
        <Snackbar open={success} onClose={handleCloseMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
          <Alert elevation={6} variant="filled" severity="success">
            A senha foi redefinida com sucesso!
          </Alert>
        </Snackbar>

        <form onSubmit={handleSubmit} className={classes.definiçaosenhaForm}>
          <Typography className={classes.title}>Definição de Nova Senha</Typography>

          <OutlinedInput className={classes.input}
            type={showPassword.pass ? 'text' : 'password'}
            id="senha"
            placeholder="Criar senha"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("pass")}
                  edge="end"
                >
                  {showPassword.pass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
            error={!!error.error1}
            autoComplete="off"
          />
          {!!error.error1 && <>
            <p className={classes.errorText}>
              <FiAlertTriangle /> {error.error1}
            </p>
          </>}

          <OutlinedInput className={classes.input}
            id="senhaConfirmar"
            placeholder="Confirmar senha"
            type={showPassword.passConfirm ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => handleClickShowPassword("passConfirm")}
                  edge="end"
                >
                  {showPassword.passConfirm ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
            error={!!error.error2}
            autoComplete="off"
          />
          {!!error.error2 && <>
            <p className={classes.errorText}>
              <FiAlertTriangle /> {error.error2}
            </p>
          </>}

          <Button className={classes.buttonDefiniçao}
            type="submit"
          >
            {success ? "Fazer login" : "Confirmar nova senha"}
          </Button>
        </form>
      </div>
    </React.Fragment >

  );
}
