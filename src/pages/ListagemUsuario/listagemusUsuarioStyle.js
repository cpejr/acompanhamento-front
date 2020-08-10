import { makeStyles } from '@material-ui/core'

const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? true : (window.innerWidth <= 450);

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

  tittle: {
    position: "relative",
    fontFamily: "DM Sans",
    fontWeight: "500",
    fontSize: "30px",
    lineHeight: "40px",
    display: "flex",
    textAlign: isMobile ? "center" : "",
    color: "#000000",
  },

  cabecario: {
    display: "flex",
    flexDirection: "row",
    width: "956px",
  },

  botaoadd: {
    position: "relative",
    marginLeft: "10%",
    width: "100%",
    height: "100%",
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: "13px",
    alignItems: "center",
    textAlign: "center",
    color: "#4F8DB5",
    textDecoration: "none"
  },

  search: {
    marginTop: "40px",
    position: 'relative',
    borderRadius: "5px",
    backgroundColor: "#42A6F5",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: isMobile ? "95%" : '486px',
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
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    width: isMobile ? "95%" : '486px',
  }
  }))