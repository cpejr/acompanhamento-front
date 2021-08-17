import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history'
import clsx from 'clsx';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import {
  Hidden,
  Drawer,
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';

import { useStyles } from './menuStyles'
import ShortcutsList from './shortcutsList';
import { AuthContext } from '../../context/AuthContext';
import { LoginContext } from "../../context/LoginContext";

export default function Menu() {
  const classes = useStyles();
  const { logOut, getUser, getUserType } = useContext(LoginContext);
  
  const UserType = getUserType();
  const [open, setOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState();
  function Client() {
    if(UserType === "PF" || UserType === "PJ") return true;
      return false;
  }
  const isClient = Client();
  console.log(isClient, "cliente ou nao");
  useEffect(() => {
    async function getUserFromSession() {
      const user = await getUser();

      setUser(user);
    }

    getUserFromSession();
  }, [])

  // MenuProfile
  const [openMenu, setOpenMenu] = React.useState(false);
  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleLogout = () => {
    logOut();
    setOpenMenu(false);
    history.push("/login");
  }

  // Drawer
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Appbar
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

        {/* Menu e perfil */}
        <div className={classes.userProfile}>
          <Button
            className={classes.link}
            onClick={handleToggleMenu}
          >
            {user ? user.name.split(' ')[0] : " "}
          </Button>
          {openMenu && <Paper
            className={classes.menuProfile}
          >
            <List>
              <ListItem button onClick={() => {
                  history.push('/au/me');
                  setOpenMenu(false);
                }}>
                <ListItemIcon><PersonIcon /></ListItemIcon>
                <ListItemText>Perfil</ListItemText>
              </ListItem>
              <ListItem button onClick={() => handleLogout()}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText>Sair</ListItemText>
              </ListItem>
            </List>
          </Paper>}
        </div >

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
