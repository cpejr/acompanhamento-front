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
    padding: "40px 0 40px 0px",
    fontSize: "30px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 0 40px 0px",
      fontSize: "20px",
    },
    fontFamily: "DM Sans",
    fontWeight: "500",
    textTransform: "uppercase"
  },

  graphic: {
    width: "800px",
    [theme.breakpoints.only("xs")]: {
      width: "80%",
    },
  },
}));
