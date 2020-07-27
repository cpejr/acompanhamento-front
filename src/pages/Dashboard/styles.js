import { makeStyles } from '@material-ui/core'

export const useStyles = makeStyles({
  root: {
    // position: "absolute",
    // height: "100%",
    minHeight: "100vh",

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

  sidebar: {
    backgroundColor: "#FE2121",
    position: "absolute",
    width: "64px",
    height: "94vh",
    left: "0px",
    top: "36px",
  },

  title: {
    // position: "relative",
    // height: "48px",
    // width: "100%",
    // top: "10%",
    // justifyContent: "center",

    // margin: "30px 0",
    padding: "30px 0 0 50px",

    // textAlign: "center",
    fontFamily: "DM Sans",
    // fontStyle: "normal",
    fontWeight: "500",
    fontSize: "40px",
    // lineHeight: "52px"
  },

  graphics: {
    // textAlign: "center",
    // alignItems: "center",
    // display: "flex",
    // flexDirection: "row",
    // width: "100%",
    margin: "30px 0",
    // width: "100vw",
    paddingLeft: "50px"
    // justifyContent: "space-between",

    // [theme.breakpoints.down('sm')]: {
    //   display: "flex",
    //   flexDirection: "column",
    // },
  },
  graphic: {
    height: "200px",
    padding: "15px",
    "& canvas": {
      height: "300px"
    }
  },
  teste: {
    width: "100%",
  }
});
