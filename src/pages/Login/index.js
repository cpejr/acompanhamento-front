import React from 'react';
import "./login.css";
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {
  TextField,
  CssBaseline,
  Typography,
  OutlinedInput,
  FormHelperText,
} from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { useStyles } from './styles'

export default function Login() {

  const classes = useStyles();

  const [values, setValues] = React.useState({
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

      <div className={classes.root}> {/* Envolve toda página */}
        <div className={classes.loginLogo}></div>
        <div className={classes.loginBox}>
          <Typography className={classes.loginTxt}>Login</Typography>

          <div className="boxemail">
            <TextField className="emaill"
              // label="email"
              id="outlined-start-adornment"
              InputProps={{
                startAdornment: <InputAdornment position="start">Email</InputAdornment>,
              }}
              variant="outlined"
            />
          </div>

          <div className="boxsenha">

            {/* jfdkadsfkad */}
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
              {/* <InputLabel className={classes.label} htmlFor="outlined-adornment-password">Senha</InputLabel> */}
              <OutlinedInput className={classes.senha}
                id="outlined-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                labelWidth={0}
              />
            </FormControl>
          </div>


          <a href='' className="esqsenha">Esqueci minha senha!</a>

          <Link to="/" className={classes.link}>
            <Button className='botaoentrar'>Entrar</Button>
          </Link>
        </div>
      </div>

    </React.Fragment>

  );
}
