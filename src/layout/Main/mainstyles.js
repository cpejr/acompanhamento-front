import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    minHeight: "100vh"
  },
  spaceContent: {
    height: "100vh",
    [theme.breakpoints.up("sm")]: {
      paddingTop: "64px",
      paddingLeft: "64px",
    },
    [theme.breakpoints.down("sm")]: {
      paddingLeft: "0",
      paddingTop: "56px"
    },
  },
}));
