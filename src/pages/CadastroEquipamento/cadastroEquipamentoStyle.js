import { makeStyles } from '@material-ui/core'
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    width: "90%",
    padding: "50px 0 66px 50px",
    paddingTop: "50px",
    paddingRight: "0px",
    paddingBottom: "66px",
    paddingLeft: "50px",

    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
      width: "100%",
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

  appbar: {
    backgroundColor: "#FFFFFF",
    width: "180px",
    boxShadow: "unset",
    borderRadius: "13px 13px 0px 0px",
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: "0px 13px 13px 13px",
  },

  containerForm: {
    padding: "20px 60px 40px",

    display: "flex",
    flexDirection: "column",

    width: "500px",
    [theme.breakpoints.only("xs")]: {
      padding: "0 5% 10%",
      width: "100%",
      alignItems: "center"
    },
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
