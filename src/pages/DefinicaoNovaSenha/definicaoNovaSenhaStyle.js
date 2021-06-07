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
  definiçaosenhaForm: { // falta os pontos de quebra (breakpoint) para ficar responsivo
    backgroundColor: azulPadrao,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "15px",

    display: "flex",
    flexDirection: "column",
    padding: "30px",
    width: "450px",
    [theme.breakpoints.only('xs')]: { //Só funciona abaixo dos 960px (sm) de largura
      padding: "5vw",
      margin: "0 10px 60px",
      maxWidth: "450px",
    },
  },

  title: {
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

  logo: {
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
    marginTop: "10px",
  },

  buttonDefiniçao: {
    background: vermelhoPadrao,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "5px",
    fontFamily: textFontFamilyPadrao,
    fontWeight: "500",
    fontSize: "14px",
    color: "#FFFFFF",

    cursor: "pointer",

    width: "100%",
    height: "56px",
    marginTop: "40px",
    marginBottom: "10px",

    "&:hover": {
      background: vermelhoPadraoEscuro,
    }
  },
  errorText: {
    color: "white",
    lineHeight: "0",
    padding: "3px",
    marginTop:"2px",
  }

}))
