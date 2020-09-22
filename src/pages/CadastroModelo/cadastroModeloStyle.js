import { makeStyles } from '@material-ui/core'
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    padding: "50px 60px 60px 50px",

    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
    },
  },

  title: {
    width: "100%",
    marginBottom: "30px",

    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,

    display: "flex",
    alignItems: "center",
    textAlign: isMobile ? "center" : "",
    color: "#000000",
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

  formContainer: {
    padding: "40px 60px",
    borderRadius: "13px",
    [theme.breakpoints.only("xs")]: {
      padding: "10%",
    },
  },
  form: {
    maxWidth: "800px"
  },

  inputs: {
    width: "100%",
    marginTop: "20px",
  },


  buttonRegister: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "2px",
    backgroundColor: azulPadraoClaro,

    marginTop: "20px",
    padding: "10px",
    paddingLeft: "15px",
    paddingRight: "20px",
    width: "150px",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },

    fontFamily: textFontFamilyPadrao,
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "#FFFFFF",

    cursor: "pointer",
  },
}))
