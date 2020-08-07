import { makeStyles } from '@material-ui/core'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    width: "100%",
    boxSizing: "border-box",
    paddingTop: "50px",
    paddingLeft: "50px",

    [theme.breakpoints.only("xs")]: {
      paddingLeft: "5%",
      paddingRight: "5%",
    },
  },

  title: {
    width: "100%",
    marginBottom: "30px",

    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "30px",
    lineHeight: "40px",

    display: "flex",
    alignItems: "center",
    textAlign: isMobile ? "center" : "",
    color: "#000000",
  },

  tabDiv: {
    display: "flex",
    flexDirection: "column",
  },

  titleTab: {
    color: "#2196F3",
    fontFamily: "Roboto",
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
    // [theme.breakpoints.only("xs")]: {
    //   width: "90%"
    // },
  },

  form: {
    backgroundColor: "#FFFFFF",
    borderRadius: "0px 13px 13px 13px",

    width: "80%",
    marginBottom: "40px",

    // display: "flex",
    paddingTop: "30px",

    [theme.breakpoints.only("xs")]: {
      width: "100%"
    },
  },

  containerForm: {
    margin: "0",
    width: "100%",

    display: "flex",
    flexDirection: "column",
  },

  inputs: {
    width: "100%",
    marginTop: "20px",
    // backgroundColor: "#FFFFFF",
    // padding: "10px",
    // width: isMobile ? "70%" : "100%",
  },


  botaocadastrar: {
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxSizing: "border-box",
    borderRadius: "2px",
    backgroundColor: "#2196F3",

    marginTop: "10px",
    // margin: "20px",
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
}))
