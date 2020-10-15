import React, { useState } from 'react';
import {
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import history from '../../history'
import { Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import TimelineIcon from '@material-ui/icons/Timeline';

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black"
  },
  menu: (props) => ({
    zIndex: "10",
    position: "absolute",
    left: props.x - 150,
    top: props.y + 27,
    width: "150px"
  }
  ),
}));

export default ({ children, id, ...rest }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [coordenadas, setCoordenadas] = useState({
    x: 0,
    y: 0,
  });
  const classes = useStyles(coordenadas)
  const handleToggleMenu = (e) => {
    setOpenMenu(!openMenu);
    setCoordenadas({ x: e.clientX, y: e.clientY });
    console.log(e.clientX)
  };
  const handleClickMenu = (path) => {
    setOpenMenu(false);
    history.push(path);
  }

  return (
    <div {...rest}>
      {openMenu && <Paper className={classes.menu}>
        <List>
          <ListItem button onClick={() => handleClickMenu(`/ae/${id}`)}>
            <ListItemIcon><EditIcon /></ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleClickMenu(`/funcionamentoequipamento/${id}`)}>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText>Detalhes</ListItemText>
          </ListItem>
        </List>
      </Paper>}

      <Link
        className={classes.link}
        onClick={(e) => handleToggleMenu(e)}>
        {children}
      </Link>
    </div>
  );
}
