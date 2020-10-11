import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    width: "90%",
    padding: "50px 0 66px 50px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
      width: "100%",
    },
  },
  chartContainer: {
    width: "100%",
    marginBottom: "35px",
  },
  chart: {
    background: "white",
    border: "1px solid rgba(0,0,0,.2)",
    padding: "0 20px 10px",
  },
  chartTable: {
    // height: "300px",
    padding: "10px 0",
    background: "white",
    border: "1px solid rgba(0,0,0,.2)",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    "& h2": {
      lineHeight: "0",
      color: "rgba(0,0,0,.4)",
      fontSize: "12px",
    },
    "& p": {
      lineHeight: "0",
      fontWeight: "bold",
      color: "rgba(0,0,0,1)",
      fontSize: "16px",
    },
  },
  selectPeriod: {
    width: "100px",
    marginLeft: "10px",
    height: "32px",
  },
  inputPeriod: {
    width: "30px",
  },
  chartButtons: {
    height: "20px",
    // background: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  changeChartButton: {
    cursor: "pointer"
  },
  table: {
    width: "100%",

    background: "white",
    border: "1px solid rgba(0,0,0,.2)",
  },

  //utilitys
  divider: {
    width: "100%",
    height: "1px",
    backgroundColor: "rgba(0,0,0,.2)",
    border: "none"
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  title: {
    lineHeight: "10px",
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    fontSize: "24px",
  },
  subtitle: {
    lineHeight: "0",
    color: "rgba(0,0,0,.4)",
    fontSize: "14px",
  },
}))
