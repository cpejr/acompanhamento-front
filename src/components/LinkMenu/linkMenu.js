import React from 'react';
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
  root: {
    position: "relative",
  },
  link: {
    textDecoration: "none",
    color: "black"
  },
  menu: {
    zIndex: "10",
    position: "absolute",
    right: "0",
    top: "20px",
    width: "150px"
  },
}));

export default ({ children, id, ...rest }) => {
  const classes = useStyles()

  const [openMenu, setOpenMenu] = React.useState(false);
  const handleToggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleClickMenu = (path) => {
    setOpenMenu(false);
    history.push(path);
  }

  return (
    <div className={classes.root} {...rest}>
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
        onClick={handleToggleMenu}>
        {children}
      </Link>
    </div>
  );
}
