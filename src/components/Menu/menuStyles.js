import { makeStyles } from '@material-ui/core/styles';
import { azulPadrao, vermelhoPadrao } from '../../StylePadrao/stylePadrao';

const drawerWidth = 280;

export const useStyles = makeStyles((theme) => ({
  // Geral ->>
  root: {
    display: 'flex',
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  appBar: {
    backgroundColor: azulPadrao,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  // Drawer Permanent ->>
  appBarShiftPerm: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButtonPerm: {
    marginRight: 36,
  },
  hidePerm: {
    display: 'none',
  },
  drawerPerm: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpenPerm: {
    backgroundColor: '#D7DFE6',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClosePerm: {
    backgroundColor: vermelhoPadrao,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(8) + 1,
  },
  contentPerm: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

  // Drawer Temporary ->>
  menuButtonTemp: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  // HeaderToolbar ->>
  headerInfos: {
    width: "100%",
    justifyContent: "space-between",
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  buttonHome: {
    textDecoration: "none",
    color: "white"
  },
  paginatitle: {
    [theme.breakpoints.up("xs")]: {
      fontSize: "24px",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "16px",
    }
  },
  user: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    textAlign: "center",
  },
}));
