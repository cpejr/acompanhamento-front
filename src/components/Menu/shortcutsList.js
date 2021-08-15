import React from 'react';
import { Link } from "react-router-dom"
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@material-ui/core'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import TocIcon from '@material-ui/icons/Toc';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import PostAddIcon from '@material-ui/icons/PostAdd';

const Items = [
  {
    title: "Início",
    to: "/dashboard",
    icon: <DonutLargeIcon />,
    adminOnly: false
  },
  {
    title: "Perfil",
    to: "/au/me",
    icon: <PersonIcon />,
    adminOnly: true
  },
  {
    title: "Cadastro de usuário",
    to: "/cadastrousuario",
    icon: <PersonAddIcon />,
    adminOnly: true
  },
  {
    title: "Cadastro de modelo",
    to: "/cadastromodelo",
    icon: <PlaylistAddIcon />,
    adminOnly: true
  },
  {
    title: "Cadastro de equipamento",
    to: "/cadastroequipamento",
    icon: < PostAddIcon />,
    adminOnly: true
  },
  {
    title: "Lista de usuários",
    to: "/listagemusuario",
    icon: <PeopleIcon />,
    adminOnly: true
  },
  {
    title: "Lista de modelo",
    to: "/listagemmodelo",
    icon: <PlaylistPlayIcon />,
    adminOnly: true
  },
  {
    title: "Lista de equipamentos",
    to: "/listagemequipamento",
    icon: <TocIcon />,
    adminOnly: false
  },
];

const ShortcutsList = ({ isClient, hidden }) => (
  <>
    {Items
      .filter(({ adminOnly }) => isClient ? !adminOnly : true)
      .map(({ title, to, icon }) => (
        <Tooltip title={title} key={title} placement="right" disableHoverListener={hidden} arrow>
          <ListItem button component={Link} to={to} >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
          </ListItem>
        </Tooltip>
      ))}
  </>
)

export default ShortcutsList;
