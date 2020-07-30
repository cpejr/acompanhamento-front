import React from 'react';
import clsx from 'clsx';

import {
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Hidden,
  List
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { useStyles } from './menuStyles'
import AdminList from './adminList';
import ClientList from './clientList';

export default function MiniDrawer(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isDesktop = window.innerWidth >= 600 ? true : false

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={isDesktop ? clsx(classes.appBarLine, { [classes.appBarShift]: open, }) : classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={isDesktop ? handleDrawerOpen : handleDrawerToggle}
            className={isDesktop ? clsx(classes.menuButtonLine, { [classes.hide]: open, }) : classes.menuButton}
          >
            <MenuIcon />
          </IconButton>

          <div className={classes.headerInfos}>
            <div className={classes.mainTitle}>
              <Typography variant="h6" className={classes.paginatitle} noWrap>
                Paraíso das Bombas
              </Typography>
            </div>
            <div className={classes.user}>
              <Typography variant="subtitle1" className={classes.userName}>
                {props.user}
              </Typography>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <div className={classes.toolbar} >
              <IconButton onClick={handleDrawerToggle}>
                <ChevronLeftIcon />
              </IconButton>
            </div >
            <Divider />
            <List>
              {props.isClient ? <ClientList /> : <AdminList />}
            </List>
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
            variant="permanent"
          >
            <div className={classes.toolbarLine} >
              <IconButton onClick={handleDrawerClose}>
                <ChevronLeftIcon />
              </IconButton>
            </div >
            <Divider />
            <List>
              {props.isClient ? <ClientList /> : <AdminList />}
            </List>
          </Drawer>
        </Hidden>
      </nav>
    </div >
  );
}
