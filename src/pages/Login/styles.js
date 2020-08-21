import { makeStyles } from '@material-ui/core'
import ThemeLogo from '../../assets/theme-logo.png';
import ThemeLogoMenor from '../../assets/theme-logo-menor.png';
import { vermelhoPadrao, azulPadrao, background, textFontFamilyPadrao } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh",
    backgroundColor: background,
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },

  loginBox: { // falta os pontos de quebra (breakpoint) para ficar responsivo
    backgroundColor: azulPadrao,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",

    display: "flex",
    flexDirection: "column",

    position: "relative",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      top: "calc(50% - 471px/2 + 0.5px)",
      left: "calc(50% - 624px/2)",

      width: "624px",
      // height: "471px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      top: "5vh",
      left: "5vw",

      width: "90vw",
      // height: "60vh",
    },
  },



  loginTxt: {

    color: "#FFFFFF",
    fontFamily: textFontFamilyPadrao,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "32px",
    // lineHeight: "37px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    // position: "relative",
    // top: "77px",
    // bottom: "71.33%",

    // [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
    // },
    // [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
    //   // position: "inherit",

    margin: "40px 0",
    // }
  },

  loginLogo: {

    position: "absolute",
    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      width: "210px",
      height: "140px",
      left: "10px",
      backgroundImage: `url(${ThemeLogo})`,
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      width: "180px",
      height: "120px",
      left: "calc(50% - 180px/2)",
      bottom: "40px",
      backgroundImage: `url(${ThemeLogoMenor})`,
    }
  },

  email: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      // marginTop: "130px",
      marginLeft: "35px",
      width: "550px"
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      marginTop: "0px",
      marginLeft: "5%",
      width: "90%"
    }
  },

  password: {
    backgroundColor: "white",
    borderRadius: "5px",

    marginTop: "20px",
    marginBottom: "20px",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      marginLeft: "35px",
      width: "550px"
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      marginLeft: "5%",
      width: "90%"
    }
  },

  forgotPassword: {
    textDecoration: "none",
    fontFamily: "DM Sans, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "26px",
    textAlign: "left",
    color: "#FFFFFF",

    "&:hover": {
      textDecoration: "underline"
    },

    marginTop: "10px",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      fontSize: "20px",
      marginLeft: "35px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      fontSize: "16px",
      marginLeft: "6%",
    }
  },

  label: {
    color: "black",
    paddingTop: "15px"
  },

  buttonLogin: {
    background: vermelhoPadrao,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "2px",

    marginTop: "10px",

    fontFamily: textFontFamilyPadrao,
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "#FFFFFF",

    cursor: "pointer",

    "&:hover": {
      background: vermelhoPadrao,
    },

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      height: "60px",
      width: "552px",

      marginBottom: "30px",
      marginLeft: "35px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      width: "90%",
      height: "56px",

      marginBottom: "30px",
      marginLeft: "5%"
    }
  }
}))
