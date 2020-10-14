import { makeStyles } from '@material-ui/core';
import { azulPadraoClaro } from '../../StylePadrao/stylePadrao';

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
    border: "1px solid rgba(0,0,0,.2)",
  },
  chart: {
    background: "white",
    borderRight: "1px solid rgba(0,0,0,.2)",
    padding: "0 20px 10px",
  },
  chartTable: {
    background: "white",
    // height: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTable: {
    // height: "70px",
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid rgba(0,0,0,.2)",
  },
  itemBody: {
    lineHeight: "0",
    fontWeight: "bold",
    color: "rgba(0,0,0,1)",
    fontSize: "16px",
  },
  itemTitle: {
    lineHeight: "0",
    color: "rgba(0,0,0,.4)",
    fontSize: "12px",
  },
  selectPeriod: {
    width: "10ch",
    margin: "0 10px",
    // height: "30px",
  },
  inputPeriod: {
    width: "5ch",
    // height: "30px",
  },
  sendChange: {
    height: "30px",
    minWidth: "30px",
    padding: "0",
  },
  chartButtons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "5px 0 35px",

    "& button": {
      fontWeight: "bold",
      margin: "0 5px",
      width: "30px",
      height: "30px",
      outline: "none",
      border: "none",
      borderRadius: "50%",
      cursor: "pointer",

      background: "transparent",
      transition: "background .3s",
    },
    "&>button:hover": {
      background: "rgba(0,0,0,.2)",
    }
  },
  table: {
    width: "100%",

    background: "white",
    border: "1px solid rgba(0,0,0,.2)",
  },

  //table
  container: {
    maxHeight: 550,
  },

  tableCell: {
    minWidth: "170px",
    position: "sticky",
    backgroundColor: azulPadraoClaro,
    fontWeight: "500",
    fontSize: "16px"
  },

  lastTableCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  nullEquipament: {
    padding: "18px",
    width: "350px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
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
    alignItems: "center",
    background: "red",
    border: "1px solid black"
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
