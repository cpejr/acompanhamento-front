import { makeStyles } from '@material-ui/core'
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, azulPadraoClaro, azulPadraoEscuro } from '../../StylePadrao/stylePadrao';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

export const useStyles = makeStyles(theme => ({

  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "32px",
    [theme.breakpoints.only("xs")]: {
      padding: "32px 8px",
    },
  },
  formContainer: {
    padding: "48px",
    borderRadius: "13px",
    [theme.breakpoints.down("xs")]: {
      padding: "48px 24px",
    },
  },

  title: {
    width: "100%",
    marginBottom: "30px",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    color: "#000000",
    textAlign: "left",
    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    },
  },

  titleTab: {
    color: azulPadraoClaro,
    fontFamily: textFontFamilyPadrao,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "15px",
    lineHeight: "15px",

    display: "flex",
    alignItems: "center",
    textAlign: "center",

    borderRadius: "20px 20px 0px 0px",
    backgroundColor: "#FFFFFF",
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: "13px",
  },

  inputs: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: "16px",
  },

  buttonContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },


  buttonRegister: {
    backgroundColor: azulPadraoClaro,
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    padding: "10px 20px",
    fontFamily: textFontFamilyPadrao,
    fontSize: "14px",
    color: "#FFFFFF",
    cursor: "pointer",

    "&:hover": {
      backgroundColor: azulPadraoEscuro,
    },
  },
}))
