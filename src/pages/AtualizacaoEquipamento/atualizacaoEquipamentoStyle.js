import { makeStyles } from "@material-ui/core"
import { titlesFontFamilyPadrao, titleFontSize, vermelhoPadrao, azulPadrao, verde } from '../../StylePadrao/stylePadrao';

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
  containerForm: {
    padding: "50px 50px 30px",
    marginBottom: "50px",
    borderRadius: "13px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5%",
    },
  },
  leftSection: {
    maxWidth: "350px",
    [theme.breakpoints.only("xs")]: {
      maxWidth: "100%"
    }
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
