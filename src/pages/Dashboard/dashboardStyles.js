import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    wight: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    [theme.breakpoints.up("sm")]: {
      padding: "40px 0 40px 0px",
      fontSize: "30px",
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
      width: "800px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
}));
