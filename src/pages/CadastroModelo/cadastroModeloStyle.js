import { makeStyles } from '@material-ui/core'
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, azulPadraoClaro, azulPadraoEscuro, azulPadrao } from '../../StylePadrao/stylePadrao';

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
    textAlign: "left",
    color: "#000000",

    [theme.breakpoints.down("xs")]: {
      textAlign: "center"
    }
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
  inputs: {
    width: "100%",
    marginTop: "49px",
    [theme.breakpoints.down("sm")]: {
      marginTop: "0px",
      marginBottom: "16px"
    }
  },
  inputRange: {
    width: "96px",
    [theme.breakpoints.up("md")]: {
      width: "192px",
    }
  },
  rangesTitle: {
    marginTop: "16px",
    textAlign: "center"
  },
  rangesContainer: {
    display: "flex", 
    flexDirection: "row", 
    justifyContent: "center",
    gap: "64px",
  },
  slider: {
    color: azulPadrao,
    width: "70%"
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
    "&:hover": {
      backgroundColor: azulPadraoEscuro,
    },
  },

  buttonContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
}))
