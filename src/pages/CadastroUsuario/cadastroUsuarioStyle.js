import { makeStyles } from '@material-ui/core'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);


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

  titulo: {
    marginBottom: "30px",

    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "30px",
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },

  formContainer: {
    padding: "33px",
  },

  inputTipo: {
    width: "250px",
    marginBottom: "20px",
  },

  Subform: {
    maxWidth: "800px",
  },

  tituloDoTipo: {
    marginBottom: "20px",

    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "22px",
    textAlign: "left",
  },

  inputForm: {
    width: "100%",
    marginBottom: "20px",
  },

  botaocadastrar: {
    boxSizing: "border-box",

    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    marginTop: "10px",
    backgroundColor: "#2196F3",
    margin: "20px",
    padding: "10px",
    paddingLeft: "15px",
    paddingRight: "20px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0.02em",
    color: "#FFFFFF",

    cursor: "pointer",
  },

  checkbox: {
    width: "100%",
  },
}));
