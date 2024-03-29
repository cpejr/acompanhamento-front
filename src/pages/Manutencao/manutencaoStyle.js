import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, titleFontSize, azulPadrao, vermelhoPadrao, verde } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "90%",
    padding: "50px 0 80px 50px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 80px",
      width: "100%",
    },
  },
  containerForm:{
    padding: "50px 50px 30px",
    borderRadius: "13px",
    marginLeft:"80px",
    [theme.breakpoints.only("xs")]: {
      padding: "15px 5%",
      marginLeft:"1px",
    },
  },
  input:{
    minHeight:"100vh",
    minWidth:"50vw",
    [theme.breakpoints.only("xs")]: {
    },

    },
 
  title: {
    display:"flex",
    justifyContent: "center",
    fontFamily: titlesFontFamilyPadrao,
    fontWeight: "500",
    fontSize: titleFontSize,
    lineHeight: "40px",
    color: "#000000",
  },
  centralizar:{
    justifyContent: "center",
  },
  centralizar2:{
     marginLeft:"40%",
    [theme.breakpoints.only("xs")]: {
      marginLeft:"10px",
    },
  },
  btn: {
    margin: "15px 5px 0",
    width: "100px",
    height: "40px",
    marginBottom:"10px",
    alignItems:"center",

    borderRadius: "2px",
    "&:first-child": {
      background: props => props.editing ? vermelhoPadrao: azulPadrao,
    },
    "&:last-child": {
      background:props => props.editing? verde : "grey",
    },
    [theme.breakpoints.only("xs")]: {
      margin: "15px 5px 0",
      "&:first-child": {
        marginRight: "10px"
      },
      "&:last-child": {
        marginLeft: "10px"
      },
    },
  },
}))
