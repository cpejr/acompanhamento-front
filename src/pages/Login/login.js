import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiLock } from "react-icons/fi"
import {
  TextField,
  CssBaseline,
  Typography,
  OutlinedInput,
  Button,
  Snackbar
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useStyles } from './styles'
import { Alert } from '@material-ui/lab';

export default function Login() {
  const classes = useStyles();

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline /> {/* Reseta todo estilo padrão do navegador (margens e padding) */}
      <div className={classes.root}>
        <Link to="/" className={classes.logo}></Link>

        <Snackbar autoHideDuration={null} open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert elevation={6} variant="filled" severity="info">
            Apenas click em Entrar
          </Alert>
        </Snackbar>

        <div className={classes.loginBox}>

          {/* Título */}
          <Typography className={classes.loginTxt}>Login</Typography>
          
          {/* Email */}
          <h5 style={{ color: "white", margin: "0" }}>Email</h5>
          <TextField className={classes.input}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <FiMail size={24} className={classes.icon} />
              </InputAdornment>,
            }}
            variant="outlined"
          />
          <h5 style={{ color: "white", margin: "0" }}>Senha</h5>
          {/* Senha */}
          <OutlinedInput className={classes.input}
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
          />

          <div>
            <Link to="./esquecisenha" className={classes.forgotPassword}>Esqueci minha senha!</Link>
          </div>

          <div>
            <Button className={classes.buttonLogin} component={Link} to="/dashboard">Entrar</Button>
          </div>

        </div>
      </div>

    </React.Fragment>

  );
}
