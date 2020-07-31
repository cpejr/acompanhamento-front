import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Hidden } from '@material-ui/core';

import { useStyles } from './menuStyles'

import AdminList from './adminList';
import ClientList from './clientList';


export default function Menu({ isClient, user }) {
  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);

  const HeaderToolbar = () => {
    return (
      <div className={classes.headerInfos}>
        <div className={classes.mainTitle}>
          <Typography variant="h6" className={classes.paginatitle} noWrap>
            Paraíso das Bombas
        </Typography>
        </div>
        <div className={classes.user}>
          <Typography variant="subtitle1" className={classes.userName}>
            {user}
          </Typography>
        </div>
      </div>
    );
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Para Desktops */}
      <Hidden xsDown>
        <AppBar
          position="fixed"
          className={clsx(classes.appBarPerm, {
            [classes.appBarShiftPerm]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButtonPerm, {
                [classes.hidePerm]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <HeaderToolbar />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawerPerm, {
            [classes.drawerOpenPerm]: open,
            [classes.drawerClosePerm]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpenPerm]: open,
              [classes.drawerClosePerm]: !open,
            }),
          }}
        >
          <div className={classes.toolbarPerm}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {isClient ? <ClientList /> : <AdminList />}
          </List>
        </Drawer>
      </Hidden>

      {/* Para Celulares */}
      <Hidden xsUp>

      </Hidden>
    </div>
  );
}
