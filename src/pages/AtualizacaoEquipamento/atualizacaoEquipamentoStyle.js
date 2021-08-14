import { makeStyles } from "@material-ui/core"
import { titlesFontFamilyPadrao, titleFontSize, vermelhoPadrao, azulPadrao, verde } from '../../StylePadrao/stylePadrao';

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
  formContainer: {
    padding: "48px",
    borderRadius: "13px",
    [theme.breakpoints.down("xs")]: {
      padding: "48px 24px",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  buttonAdd: {
    fontWeight: "500",
    fontSize: "13px",
    color: verde,
    "&:hover": {
      color: "#fff",
      backgroundColor: verde,
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

  input: {
    boxSizing: "border-box",
    width: "100%",
    marginBottom: "16px",
  },
  inputType: {
    width: "100%",
    flexDirection: "colunm",
  },
  buttonContainer: {
    width: "100vw",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  btn: {
    margin: "30px 10px 0",
    width: "150px",
    height: "50px",

    borderRadius: "2px",
    color: "white",
    "&:first-child": {
      background: props => props.updating ? verde : azulPadrao,
    },
    "&:last-child": {
      background: vermelhoPadrao,
      fontSize: "12px"
    },
    [theme.breakpoints.only("xs")]: {
      margin: "0",
      marginBottom: "16px"
    },

    btnOwner: {
      color: verde,
      maxHeight: "50px",
    }
  }
}));
