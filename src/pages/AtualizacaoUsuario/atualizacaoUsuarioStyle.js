import { makeStyles } from "@material-ui/core"
import { titlesFontFamilyPadrao, titleFontSize, vermelhoPadrao, azulPadrao, verde, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "32px",
    [theme.breakpoints.only("xs")]: {
      padding: "32px 8px",
    },
  },

  buttonAdd:{

    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
    },

    [theme.breakpoints.down("sm")]: {
      marginBottom: "16px"
    }
  },

  buttonContainer: {
    marginTop: "16px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center"
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
  formContainer: {
    padding: "48px",
    borderRadius: "13px",
    [theme.breakpoints.down("xs")]: {
      padding: "48px 24px",
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
  btn: {
    margin: "30px 40px 0",
    width: "150px",
    height: "50px",
    borderRadius: "2px",
    color: "white",
    "&:first-child": {
      background: props => props.updating ? verde : azulPadrao,
    },
    "&:last-child": {
      background: vermelhoPadrao
    },
    [theme.breakpoints.only("xs")]: {
      margin: "0",
      marginBottom: "16px"
    },
  },
  btnPassword: {
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
    [theme.breakpoints.down("sm")]: {
      fontSize: "10px",
      marginBottom: "16px"
    }
  }
}));
