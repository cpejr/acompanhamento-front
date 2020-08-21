import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, titleFontSize } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100%",
    wight: "100%",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    padding: "40px 0 40px 0px",
    fontSize: titleFontSize,
    [theme.breakpoints.only("xs")]: {
      padding: "30px 0 40px 0px",
      fontSize: "20px",
    },
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    textTransform: "uppercase"
  },

  graphic: {
    width: "70%",
    [theme.breakpoints.only("xs")]: {
      width: "100%",
    },
  },
}));
