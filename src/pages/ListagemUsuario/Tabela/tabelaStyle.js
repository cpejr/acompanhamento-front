import { makeStyles } from "@material-ui/core/styles";
import { azulPadraoClaro, verde } from '../../../StylePadrao/stylePadrao';

export const useStyles = makeStyles({
  root: {
    width: '90%',
  },
  container: {
    maxHeight: 550,
  },
  buttonAdd:{

    fontWeight: "500",
    fontSize: "13px",
    color: verde,
    marginRight: "4px",

    "&:hover": {
      color: "#fff",
      backgroundColor: verde,
    }
  },
  buttonUser: {
    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
    }
  },
  tableCell: {
    minWidth: "170px",
    position: "sticky",
    backgroundColor: azulPadraoClaro,
    fontWeight: "500",
    fontSize: "16px",
  },
  lastTableCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  nullUser: {
    padding: "18px",
    width: "350px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
  },
  ButtonData: {
    alignItems: "center",
    marginLeft: "40px",
    padding: "0 20px",
    border: "1px solid", azulPadraoClaro,

    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
      border: "none",
    }
  }
});
