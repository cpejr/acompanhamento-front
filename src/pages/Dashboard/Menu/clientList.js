import React from 'react';
import { Link } from "react-router-dom"

import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TocIcon from '@material-ui/icons/Toc';

function ClientList() {
  return (
    <React.Fragment>
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
        <ListItemIcon><PlaylistAddIcon /></ListItemIcon>
        <ListItemText>Cadastro Equipamentos</ListItemText>
      </ListItem>
    </React.Fragment>
  );
}

export default ClientList;
