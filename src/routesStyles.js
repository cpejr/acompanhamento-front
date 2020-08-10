import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  spaceContent: {
    boxSizing: "border-box",
    minHeight: "100vh",
    backgroundColor: "#E5E5E5",

    overflowX: "hidden",

    marginLeft: "64px",
    paddingTop: "64px",
    width: "calc(100% - 64px)",

    [theme.breakpoints.only("xs")]: {
      marginLeft: "0",
      paddingTop: "56px",
      width: "100%",
    },
  },
}));
