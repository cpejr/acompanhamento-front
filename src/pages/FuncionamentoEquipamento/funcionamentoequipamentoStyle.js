import { makeStyles } from '@material-ui/core';
import { azulPadraoClaro, verde, vermelhoPadrao } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    width: "100%",
    padding: "16px 16px 32px 16px",
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
    position: "relative",
  },
  chartAlert: {
    position: "absolute",
    // lineHeight: "0",
    textAlign: "center",
    fontWeight: "bold",
    color: "rgba(0,0,0,.7)",
    fontSize: "24px",
    [theme.breakpoints.only('xs')]: {
      fontSize: "16px",
      top: "60%"
    },

    top: "50%",
    left: "52%",
    transform: "translate(-50%, -50%)"
  },
  chartTable: {
    background: "white",
    width: "100%"
  },
  itemTable: {
    // height: "70px",
    padding: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    borderRight: "1px solid rgba(0,0,0,.2)",
  },
  tableData: {
    borderBottom: "1px solid rgba(0,0,0,.2)", 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    width: "90%", 
    margin: "8px 0px",
    "&:last-child": {
      borderBottom: "0px solid rgba(0,0,0,.2)",
    }
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
  itemTitleFilter: {
    lineHeight: "0",
    color: "black",
    fontSize: "18px",
    fontWeight: 600
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
    margin: "16px",

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
  buttonApply: {
    backgroundColor: verde,
    "&:hover": {
      backgroundColor: verde,
    }
  },
  buttonAxis: {
    borderColor: vermelhoPadrao,
    color: vermelhoPadrao,
    "&:hover": {
      color: vermelhoPadrao,
    }
  }
}))
