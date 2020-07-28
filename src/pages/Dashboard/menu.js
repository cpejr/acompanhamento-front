import React from 'react';
import { Link } from "react-router-dom"

import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TocIcon from '@material-ui/icons/Toc';
import PeopleIcon from '@material-ui/icons/People';
import { useStyles } from './menuStyles'

export default function MiniDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
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
              {/* <Avatar className={classes.avatar}>T</Avatar> */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
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
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <List>
          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon><PersonAddIcon /></ListItemIcon>
            <ListItemText>Cadastro Cliente</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText>Cadastro Funcionário</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon><PeopleIcon /></ListItemIcon>
            <ListItemText>Lista de Clientes</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
            <ListItemText>Cadastro Equipamentos</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon><TocIcon /></ListItemIcon>
            <ListItemText>Lista de Equipamentos</ListItemText>
          </ListItem>

          <ListItem
            button
            component={Link}
            to=""
          >
            <ListItemIcon></ListItemIcon>
            <ListItemText>Cliente X Equipamento</ListItemText>
          </ListItem>

        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        {props.children}
        {console.log('renderizei')}

      </main>
    </div>
  );
}



