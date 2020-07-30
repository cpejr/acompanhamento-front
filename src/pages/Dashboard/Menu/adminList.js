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

function AdminList() {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
}

export default AdminList;
