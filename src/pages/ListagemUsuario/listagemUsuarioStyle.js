import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, titleFontSize, azulPadraoClaro, azulPadrao } from '../../StylePadrao/stylePadrao';

export const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    padding: "32px",
    [theme.breakpoints.only("xs")]: {
      padding: "30px 5% 80px",
      width: "100%",
    },
  },


  allsearch:{
    display: "flex",
    flexDirection: "column",
  },

  header: {
    display: "flex",
    //marginLeft: "35%",
    flexDirection: "row",
    justifyContent: "flex-start",
    [theme.breakpoints.only("xs")]: {
      justifyContent: "space-between",
    },
  },

  searchplusfilter: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    }
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
    marginLeft: "30px",
    padding: "0 20px",
    border: "1px solid", azulPadraoClaro ,
 
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

  search: {
    marginTop: "40px",
    position: 'relative',
    borderRadius: "5px",
    // backgroundColor: azulPadraoClaro,
    border: "2px solid rgba(0,0,0,0.8)",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '486px',
    [theme.breakpoints.down('xs')]: {
      width: "100%",
    }
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchFilter: {
    margin: "20px 0",
   // marginLeft: "30%",
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.only('xs')]: {
      margin: "20px 0 0",
      flexDirection: "column",
    },
    "&>*": {
      marginRight: "30px",
    }
  },
  checkbox: {
    color: azulPadrao,
  },

  inputRoot: {
    color: 'inherit',
  },
  input: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // width: isMobile ? "270px" : '430px',
    width: "430px",
 
    [theme.breakpoints.down('xs')]: {
      fontSize: "12px",
      width: "270px",
    }
  },

  filter: {
    justifyContent: "center",
    borderRadius: "5px",
    position: 'relative',
    // backgroundColor: azulPadraoClaro,
    border: "2px solid rgba(0,0,0,0.8)",
    marginTop: "40px",
    fontSize: "20px",
    height: "40px",
    width: "120px",
    outline: "none",
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    [theme.breakpoints.down('sm')]: {
      marginTop: "10px",
    }
  },

  selectItens: {
    position: 'relative',
    height: "100%",
    width: '100%',
    fontSize: "12px",
  },
  

  table: {
    marginTop: "30px",
  },  
    
}))
