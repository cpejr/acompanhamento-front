import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    minHeight: "100vh"
  },
  spaceContent: {
    minHeight: "100vh",
    backgroundColor: "#E5E5E5",
    paddingTop: "64px",
    paddingLeft: "80px",
    [theme.breakpoints.only("xs")]: {
      paddingLeft: "0",
      paddingTop: "56px"
    },
  },
}));
