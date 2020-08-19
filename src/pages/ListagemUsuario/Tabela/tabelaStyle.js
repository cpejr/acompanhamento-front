import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    // overflow: 'hidden',
    // maxHeight: 550,
  },
  tableCell: {
    minWidth: "170px",
    position: "sticky",
    backgroundColor: "#2196F3",
    fontWeight: "500",
    fontSize: "16px"
  },
  lastTableCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nullUser: {
    padding: "18px",
    fontWeight: "400",
    fontSize: "16px",
    textAlign: "left",
  },
});
