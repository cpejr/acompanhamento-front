import { makeStyles } from '@material-ui/core'
import ThemeLogo from '../../assets/theme-logo.png';

export const useStyles = makeStyles(theme => ({
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

    position: "relative",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      top: "calc(50% - 471px/2 + 0.5px)",
      left: "calc(50% - 624px/2)",

      width: "624px",
      height: "471px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      top: "5vh",
      left: "5vw",

      width: "90vw",
      // height: "60vh",
    }

  },

  loginTxt: {
    position: "relative",
    top: "77px",
    bottom: "71.33%",

    color: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "32px",
    lineHeight: "37px",

    display: "flex",
    justifyContent: "center",
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
      bottom: "40px"
    }
  },

  emaill: {
    backgroundColor: "#FFFFFF",
    borderRadius: "5px",
    marginTop: "130px",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      marginLeft: "35px",
      width: "550px"
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      marginLeft: "5%",
      width: "90%"
    }
  },

  senha: {
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

  esqsenha: {
    textDecoration: "none",
    fontFamily: "DM Sans, sans-serif",
    fontStyle: "normal",
    fontWeight: "normal",
    lineHeight: "26px",
    textAlign: "left",
    color: "#FFFFFF",

    marginTop: "25px",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      fontSize: "20px",
      marginLeft: "35px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      fontSize: "16px",
      marginLeft: "20px",
    }
  },

  label: {
    color: "black",
    paddingTop: "15px"
  },

  botaoentrar: {
    background: "#FE2121",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "2px",

    marginTop: "25px",

    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "16px",
    letterSpacing: "0.02em",
    textTransform: "uppercase",
    color: "#FFFFFF",

    cursor: "pointer",

    [theme.breakpoints.up('sm')]: { //Só funciona acima dos 960px (sm) de largura 
      width: "552px",
      height: "73px",

      marginLeft: "35px",
    },
    [theme.breakpoints.down('sm')]: { //Só funciona abaixo dos 960px (sm) de largura
      width: "90%",
      height: "50px",

      marginBottom: "30px",
      marginLeft: "5%"
    }
  }
}))
