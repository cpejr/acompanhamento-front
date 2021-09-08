import { makeStyles } from "@material-ui/core"
import { grey } from "@material-ui/core/colors";
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
  slider: {
    color: azulPadrao,
    width: "70%",
  },
  inputs: {
    width: "100%",
    marginBottom: "20px",
  }, 
  centralizar: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    margin: "30px 10px 0",
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
