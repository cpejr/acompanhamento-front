import { makeStyles } from '@material-ui/core'

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
    backgroundColor: "#2196F3",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "2px",
    padding: "10px 20px",
    fontFamily: "Roboto",
    fontSize: "14px",
    color: "#FFFFFF",

    cursor: "pointer",
  },

  checkbox: {
    width: "100%",
    marginBottom: "20px",
  },
}));
