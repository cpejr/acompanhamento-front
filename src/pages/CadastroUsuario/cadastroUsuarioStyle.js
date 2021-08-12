import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, textFontFamilyPadrao, titleFontSize, subtitleFontSize, azulPadraoClaro, azulPadraoEscuro } from '../../StylePadrao/stylePadrao';


export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // padding: "50px 60px 60px 50px",
    padding: "30px 5% 30px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
    },
  },

  title: {
    marginBottom: "30px",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    textAlign: "center",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },

  // formulario:{
  //   display: "flex",
  //   flexDirection: "column",
  // }, 

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
    flexDirection:"colunm",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
      marginLeft:"1%",
      
    },
  },

  titleType: {
    marginBottom: "20px",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: subtitleFontSize,
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      marginLeft:"1%",
    },
  },

  inputForm: {
   width: "100%",
  //  marginBottom: "20px",
   display:"flex",
   flexDirection:"column",
   justifyContent:"center",
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
  buttonContainer: {
    width: "100vw",
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },

  checkbox: {
    width: "100%",
    marginBottom: "20px",
  },
}));
