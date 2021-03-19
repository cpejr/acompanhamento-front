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
import TimelineIcon from '@material-ui/icons/Timeline';
import SearchIcon from '@material-ui/icons/Search';

export const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: "none",
    color: "black",
    background: "transparent",
    outline: "none",
    border: "none",
    height: "100%"
  },
  menu: (props) => ({
    zIndex: "10",
    position: "absolute",
    left: props.x - 150,
    top: props.y + 13,
    width: "150px"
  }
  ),
}));

export default ({ children, id, openMenu, setOpenMenu, ...rest }) => {
  // const [openMenu, setOpenMenu] = useState(false);
  const [coordenadas, setCoordenadas] = useState({
    x: 0,
    y: 0,
  });
  const classes = useStyles(coordenadas)
  const handleToggleMenu = (e) => {
    if (openMenu === id) setOpenMenu("");
    else setOpenMenu(id)

    setCoordenadas({ x: e.clientX, y: e.clientY });
  };
  const handleClickMenu = (path) => {
    setOpenMenu(id);
    history.push(path);
  }

  return (
    <div {...rest}>
      {openMenu === id && <Paper className={classes.menu}>
        <List>
          <ListItem button onClick={() => handleClickMenu(`/ae/${id}`)}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText>Detalhes</ListItemText>
          </ListItem>
          <ListItem button onClick={() => handleClickMenu(`/funcionamentoequipamento/${id}`)}>
            <ListItemIcon><TimelineIcon /></ListItemIcon>
            <ListItemText>Dados</ListItemText>
          </ListItem>
        </List>
      </Paper>}

      <button
        className={classes.link}
        onClick={(e) => handleToggleMenu(e)}>
        {children}
      </button>
    </div>
  );
}
