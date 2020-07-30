import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",

    backgroundColor: "#E5E5E5",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    [theme.breakpoints.up("sm")]: {
      paddingLeft: "64px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
    },
  },

  fullList: {
    width: 'auto',
  },

  appbar: {
    backgroundColor: "#2D64F3"
  },

  title: {
    [theme.breakpoints.up("sm")]: {
      padding: "40px 0 40px 0px",
      fontSize: "40px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 0 40px 0px",
      fontSize: "20px",
    },
    fontFamily: "DM Sans",
    fontWeight: "500",
    textTransform: "uppercase"
  },

  graphic: {
    [theme.breakpoints.up("sm")]: {
      // height: "400px",
      width: "800px",
    },
    [theme.breakpoints.down("sm")]: {
      // height: "100vw",
      width: "100vw",
    },
  },
}));
