import { makeStyles } from '@material-ui/core'

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

    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "30px",
    lineHeight: "40px",

    display: "flex",
    alignItems: "center",
    textAlign: isMobile ? "center" : "",
    color: "#000000",
  }

}))