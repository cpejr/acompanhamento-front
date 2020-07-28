import { makeStyles } from '@material-ui/core/styles';
import { ListItemIcon } from '@material-ui/core';

const drawerWidth = 270;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#2D64F3',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    backgroundColor: '#D7DFE6',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: '#FE2121',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    // padding: theme.spacing(3),
  },
  headerInfos: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row"
  },
  users: {
    display: "flex",
    flexDirection: "row",
  },
  user: {
    marginTop: "15%",
    marginRight: "2%",
    fontSize: "1.2rem"
  },
  username: {
    fontSize: "0.8rem",
    fontWeight: "200",
    textAlign: "center",
    marginTop: "12%",
  },
  paginatitle: {
    [theme.breakpoints.up("xs")]: {
      paddingTop: "0px",
      fontSize: "24px",
    },
    [theme.breakpoints.down("xs")]: {
      paddingTop: "7px",
      fontSize: "16px",
    }
  },
  avatar: {
    backgroundColor: "blue",
    color: "white"
  }
}));
