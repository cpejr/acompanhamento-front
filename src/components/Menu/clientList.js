import React from 'react';
import { Link } from "react-router-dom"

import {
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core'
import TocIcon from '@material-ui/icons/Toc';
import PersonIcon from '@material-ui/icons/Person';

function ClientList() {
  return (
    <React.Fragment>
      <ListItem
        button
        component={Link}
        to="/au/me"
      >
        <ListItemIcon><PersonIcon /></ListItemIcon>
        <ListItemText>Perfil</ListItemText>
      </ListItem>

      <ListItem
        button
        component={Link}
        to="/listagemusuario"
      >
        <ListItemIcon><TocIcon /></ListItemIcon>
        <ListItemText>Lista de Equipamentos</ListItemText>
      </ListItem>
    </React.Fragment>
  );
}

export default ClientList;
