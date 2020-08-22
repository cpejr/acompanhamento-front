import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, titleFontSize, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",

    width: "90%",
    padding: "50px 0 66px 50px",
    paddingTop: "50px",
    paddingRight: "0px",
    paddingBottom: "66px",
    paddingLeft: "50px",

    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
      width: "100%",
    },
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "space-between",
    },
  },

  title: {
    position: "relative",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    lineHeight: "40px",
    display: "flex",
    color: "#000000",
  },

  buttonAdd: {
    marginLeft: "40px",
    padding: "0 20px",
    border: "1px solid", azulPadraoClaro,

    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: "13px",
    color: azulPadraoClaro,

    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
      border: "none",
    }
  },
}))
