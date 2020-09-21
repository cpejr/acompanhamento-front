import { makeStyles } from '@material-ui/core'
import ThemeLogoMenor from '../../assets/theme-logo-menor.png';
import { vermelhoPadrao, vermelhoPadraoEscuro, azulPadrao, background, textFontFamilyPadrao } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: background,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  loginBox: { // falta os pontos de quebra (breakpoint) para ficar responsivo
    backgroundColor: azulPadrao,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",

    display: "flex",
    flexDirection: "column",
    padding: "30px",
    width: "450px",

    [theme.breakpoints.only('xs')]: { //Só funciona abaixo dos 960px (sm) de largura
      padding: "5vw",
      margin: "0 10px 80px",
      maxWidth: "450px",
    },
  },

  loginTxt: {
    color: "#FFFFFF",
    fontFamily: textFontFamilyPadrao,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "20px 0 30px",
    [theme.breakpoints.only('xs')]: {
      margin: "20px 0",
      fontSize: "25px"
    }
  },

  loginLogo: {
    backgroundImage: `url(${ThemeLogoMenor})`,
    position: "absolute",
    width: "180px",
    height: "120px",
    top: "10px",
    left: "10px",
    [theme.breakpoints.only('xs')]: {
      left: "calc(50% - 180px/2)",
      top: "calc(100vh - 120px - 10px)",
    }
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    width: "100%",
    marginBottom: "20px",
  },

  forgotPassword: {
    color: "white",
    fontWeight: "400",
    marginTop: "30px",
    marginBottom: "20px",
    lineHeight: "0",
    textDecoration: "none",

    "&:hover": {
      textDecoration: "underline",
    }
  },

  buttonLogin: {
    background: vermelhoPadrao,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontFamily: textFontFamilyPadrao,
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    textTransform: "uppercase",
    color: "#FFFFFF",

    cursor: "pointer",

    width: "100%",
    height: "56px",
    marginBottom: "10px",
    marginTop: "20px",

    "&:hover": {
      background: vermelhoPadraoEscuro,
    },
  }
}))
