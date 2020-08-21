import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, subtitleFontSize, azulPadraoClaro } from '../../StylePadrao/stylePadrao';


export const useStyles = makeStyles((theme) => ({
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
    marginBottom: "30px",

    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },

  formContainer: {
    padding: "50px 60px",
    borderRadius: "13px",
    [theme.breakpoints.only("xs")]: {
      padding: "10%",
    },
  },

  inputType: {
    width: "250px",
    marginBottom: "30px",
    [theme.breakpoints.only("xs")]: {
      width: "100%"
    },
  },

  Subform: {
    maxWidth: "800px",
  },

  titleType: {
    marginBottom: "20px",

    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: subtitleFontSize,
    textAlign: "left",
  },

  inputForm: {
    width: "100%",
    marginBottom: "20px",
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

    width: "200px",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },

  checkbox: {
    width: "100%",
    marginBottom: "20px",
  },
}));
