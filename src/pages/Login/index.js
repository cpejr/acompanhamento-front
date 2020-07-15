import React from 'react';
import {
  CssBaseline,
  makeStyles,
  Typography,
} from '@material-ui/core';

import ThemeLogo from '../../assets/theme-logo.png';

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: "#E5E5E5",
  },

  loginBox: { // falta os pontos de quebra (breakpoint) para ficar responsivo
    backgroundColor: "#2D64F3",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",

    width: "624px",
    height: "471px",

    position: "relative",
    top: "calc(50% - 471px/2 + 0.5px)",
    left: "calc(50% - 624px/2)",
  },

  loginTxt: {
    position: "absolute",
    left: "0%",
    right: "0%",
    top: "4.44%",
    bottom: "71.33%",

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

  return (
    <React.Fragment>
      <CssBaseline /> {/* Reseta todo estilo padrão do navegador (margens e padding) */}

      <div className={classes.root}> {/* Envolve toda página */}
        <div className={classes.loginLogo}></div>
        <div className={classes.loginBox}>
          <Typography className={classes.loginTxt}>Login</Typography>
        </div>

      </div>

    </React.Fragment>
  );
}
