import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  root: {
    boxSizing: "border-box",
    display: "flex",
    width: "90%",
    padding: "50px 0 66px 50px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 30px",
      width: "100%",
    },
  },
  chartContainer: {
    width: "100%",
    marginBottom: "35px",
  },
  chart: {
    height: "300px",
    background: "green"
  },
  chartTable: {
    height: "300px",
    background: "olive"
  },
  chartButtons: {
    height: "20px",
    background: "blue"
  },
  table: {
    background: "red",
    width: "100%",
    marginBottom: "35px",
    height: "100px"
  },
}))
