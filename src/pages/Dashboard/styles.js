import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles(theme => ({
  root: {
    // position: "absolute",
    // height: "100%",
    minHeight: "100vh",
    paddingLeft: "64px",

    backgroundColor: "#E5E5E5",
    // position: "relative",
    display: "flex",
    flexDirection: "column",
  },

  fullList: {
    width: 'auto',
  },

  appbar: {
    backgroundColor: "#2D64F3"
  },

  title: {
    [theme.breakpoints.up("sm")]: {
      padding: "70px 0 50px 0px",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "30px 0 0px 0px",
    },
    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "40px",
    textTransform: "uppercase"
  },

  graphics: {
    // textAlign: "center",
    // alignItems: "center",
    // display: "flex",
    // flexDirection: "row",
    // width: "100%",
    margin: "30px 0",
    // width: "100vw",
    // paddingLeft: "50px"
    // justifyContent: "space-between",

    // [theme.breakpoints.down('sm')]: {
    //   display: "flex",
    //   flexDirection: "column",
    // },
  },
  graphic: {
    // height: "200px",
    padding: "15px",
    // "& canvas": {
    //   height: "100%"
    // }
  },
  teste: {
    // height: "100%",
  }
}));
