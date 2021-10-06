import { makeStyles } from "@material-ui/core/styles";
import { azulPadraoClaro } from '../../../StylePadrao/stylePadrao';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  },

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
  buttonAdd:{

    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
    }
  },

  lastTableCell: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },

  nullModel: {
    padding: "18px",
    width: "350px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
  },
}));
