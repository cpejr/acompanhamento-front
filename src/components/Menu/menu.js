import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {
  Hidden,
  Drawer,
  AppBar,
  Toolbar,
  List,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Menu as MenuPerfil,
  MenuItem,
  Button
} from '@material-ui/core';

import { useStyles } from './menuStyles'
import ShortcutsList from './shortcutsList';
import { AuthContext } from '../../context/AuthContext';

export default function Menu() {
  const classes = useStyles();
  const { user, isClient } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const HeaderToolbar = () => {
    return (
      <div className={classes.headerInfos}>
        <div className={classes.mainTitle}>
          <Link className={classes.link} to="/dashboard">
            <Typography variant="h6" className={classes.pagTitle} noWrap>
              Paraíso das Bombas
            </Typography>
          </Link>
        </div>
        <div className={classes.user}>
          <Button className={classes.link} component={Link} to="/au/me">
            {user.name}
          </Button>
        </div>
      </div >
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* Para Desktops */}
      <Hidden only={['xs']} >
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
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
          <div className={classes.toolBar}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* {isClient ? <ClientList /> : <AdminList />} */}
            <ShortcutsList isClient={isClient} hidden={(open || mobileOpen)} />
          </List>
        </Drawer>
      </Hidden>

      {/* Para Celulares */}
      <Hidden smUp>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButtonTemp}
            >
              <MenuIcon />
            </IconButton>
            <HeaderToolbar />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <div className={classes.toolBar}>
            <IconButton onClick={handleDrawerToggle}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            {/* {isClient ? <ClientList /> : <AdminList />} */}
            <ShortcutsList isClient={isClient} hideen={true} />
          </List>
        </Drawer>
      </Hidden>

    </div>
  );
}
