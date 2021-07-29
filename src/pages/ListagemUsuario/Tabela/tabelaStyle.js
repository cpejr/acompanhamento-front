import { makeStyles } from "@material-ui/core/styles";
import { azulPadraoClaro } from '../../../StylePadrao/stylePadrao';

export const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 550,
  },
  buttonAdd:{
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
  nullUser: {
    padding: "18px",
    width: "350px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
  },
});
