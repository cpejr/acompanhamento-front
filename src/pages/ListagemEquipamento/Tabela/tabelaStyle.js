import { makeStyles } from "@material-ui/core/styles";
import { azulPadraoClaro, verde } from '../../../StylePadrao/stylePadrao';

export const useStyles = makeStyles({
  root: {
    width: '100%',
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
    color: verde,
    marginRight: "4px",

    "&:hover": {
      color: "#fff",
      backgroundColor: verde,
    }
  },
  buttonAdd_2:{

    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,
    marginRight: "4px",

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
    }
  },
  buttonAdd_3:{

    fontWeight: "500",
    fontSize: "13px",
    color: "orange",
    marginRight: "4px",

    "&:hover": {
      color: "#fff",
      backgroundColor:"orange" ,
    }
  },

  // lastTableCell: {
  //   display: "flex",
  //   justifyContent: "space-between",
  //   alignItems: "center"
  // },

  nullEquipament: {
    padding: "18px",
    width: "350px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
  },
});
