import React from 'react';
import "./login.css";
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {
  TextField,
  CssBaseline,
  makeStyles,
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

import ThemeLogo from '../../assets/theme-logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: "#E5E5E5",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },

  loginBox: { // falta os pontos de quebra (breakpoint) para ficar responsivo
    backgroundColor: "#2D64F3",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",

    display: "flex",
    flexDirection: "column",

    width: "624px",
    height: "471px",

    position: "relative",
    top: "calc(50% - 471px/2 + 0.5px)",
    left: "calc(50% - 624px/2)",

  },

  loginTxt: {
    position: "relative",
    left: "0%",
    right: "0%",
    top: "77px",
    bottom: "71.33%",
    justifyContent: "center",

    color: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "32px",
    lineHeight: "37px",
    display: "flex",
    alignItems: "center",
    textAlign: "center"
  },

  loginLogo: {
    backgroundImage: `url(${ThemeLogo})`,

    position: "absolute",
    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      width: "210px",
      height: "140px",
      left: "10px"
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      width: "154px",
      height: "93px",
      left: "calc(50% - 154px/2)",
      bottom: "34px"
    }
  }
}))

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


          <TextField
            label=""
            id="outlined-start-adornment"
            className={clsx(classes.margin, classes.textField)}
            InputProps={{
              startAdornment: <InputAdornment position="start"></InputAdornment>,
            }}
            variant="outlined"
          />
          <FormControl className={clsx(classes.margin, classes.textField)} id="senha">
            <InputLabel htmlFor="outlined-adornment-password"></InputLabel>
            <OutlinedInput
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
              labelWidth={70}
            />
          </FormControl>


          <a href='' className="esqsenha">Esqueci minha senha!</a>

          <Link to="/" className={classes.link}>
            <Button className='botaoentrar'>Entrar</Button>
          </Link>
        </div>
      </div>

    </React.Fragment>
    
  );
}
