import React from 'react';
import { Link } from "react-router-dom"

import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TocIcon from '@material-ui/icons/Toc';
import AddIcon from '@material-ui/icons/Add';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';

function AdminList() {
  return (
    <React.Fragment>
      <ListItem
        button
        component={Link}
        to=""
      >
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText>Perfil</ListItemText>
      </ListItem>

      <ListItem
        button
        component={Link}
        to="/app/cadastro-usuario"
      >
        <ListItemIcon><PersonAddIcon /></ListItemIcon>
        <ListItemText>Cadastro de usuário</ListItemText>
      </ListItem>

      {/* <ListItem
        button
        component={Link}
        to=""
      >
        <ListItemIcon><AddIcon /></ListItemIcon>
        <ListItemText>Cadastro de funcionário</ListItemText>
      </ListItem> */}

      <ListItem
        button
        component={Link}
        to=""
      >
        <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
        <ListItemText>Cadastro de equipamento</ListItemText>
      </ListItem>

      <ListItem
        button
        component={Link}
        to=""
      >
        <ListItemIcon><PeopleIcon /></ListItemIcon>
        <ListItemText>Lista de usuários</ListItemText>
      </ListItem>

      <ListItem
        button
        component={Link}
        to=""
      >
        <ListItemIcon><TocIcon /></ListItemIcon>
        <ListItemText>Lista de equipamentos</ListItemText>
      </ListItem>

    </React.Fragment>
  );
}

export default AdminList;
