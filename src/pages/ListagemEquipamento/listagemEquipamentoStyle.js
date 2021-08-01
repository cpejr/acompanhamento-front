import { makeStyles } from '@material-ui/core';
import { titlesFontFamilyPadrao, titleFontSize, azulPadraoClaro } from '../../StylePadrao/stylePadrao';

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
    fontWeight: "200",
    fontSize: "13px",
    textAlign: "center",
    color: azulPadraoClaro,
    "&:hover": {
      color: "#fff",
      backgroundColor: azulPadraoClaro,
      border: "none",
    },
    [theme.breakpoints.only("xs")]: {
      marginLeft: "20px",
      fontSize: "10px",
    },
  },

  search: {
    marginTop: "40px",
    position: 'relative',
    borderRadius: "5px",
    // backgroundColor: azulPadraoClaro,
    border: "2px solid rgba(0,0,0,0.8)",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    height: "40px",
    width: '486px',
    [theme.breakpoints.down('xs')]: {
      width: "100%",
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

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  input: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: "430px",
    [theme.breakpoints.down('xs')]: {
      fontSize: "12px",
      width: "270px",
    }
  },

  table: {
    marginTop: "30px"
  },

  searchplusfilter: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.down('sm')]: {
      flexDirection: "column"
    }
  },

  selectItens: {
    position: 'relative',
    height: "100%",
    width: '100%',
    fontSize: "12px",
  },

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))
