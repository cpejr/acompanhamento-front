import { makeStyles } from "@material-ui/core"
import { titlesFontFamilyPadrao, titleFontSize, vermelhoPadrao, azulPadrao, verde, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    padding: "30px 60px 0",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5%",
    },
  },

  buttonAdd:{
    marginLeft: "38%",
    padding: "0 45px",
    border: "1px solid", azulPadraoClaro,
    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,
    [theme.breakpoints.only("xs")]: {
        marginLeft:"1%",    
     },
    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
      border: "none",
    }
  },

  title: {
    marginBottom: "30px",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    textAlign: "left",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  containerForm: {
    padding: "50px 50px 30px",
    borderRadius: "13px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5%",
    },
  },
  grid: {
    padding: "0 40px",
    [theme.breakpoints.only("xs")]: {
      padding: "0",
    },
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: "30px",
  },
  centralizar: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    margin: "30px 40px 0",
    width: "150px",
    height: "50px",
    borderRadius: "2px",
    "&:first-child": {
      background: props => props.updating ? verde : azulPadrao,
    },
    "&:last-child": {
      background: vermelhoPadrao
    },
    [theme.breakpoints.only("xs")]: {
      margin: "0",
      "&:first-child": {
        marginRight: "10px"
      },
      "&:last-child": {
        marginLeft: "10px"
      },
    },
  }
}));
