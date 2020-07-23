import React from 'react';
import { CssBaseline } from "@material-ui/core"
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './styles'
import { FiMenu } from "react-icons/fi"

export default function Menu() {

    const classes = useStyles();

    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {['Cadastro de Cliente',
                    'Cadastro de Funcionário',
                    'Lista de Clientes',
                    'Cadastro de Equipamentos',
                    'Lista de Equipamentos',
                    'Cliente X Equipamento'].map((text) => (
                        <ListItem button key={text}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    return (
        <div>
             <div className={classes.appbar}>
                {['left'].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <CssBaseline />
                        <Button
                            onClick={toggleDrawer(anchor, true)}>
                            <FiMenu size={24} color="#FFFFFF" className={classes.icon} />
                        </Button>
                        <SwipeableDrawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                            onOpen={toggleDrawer(anchor, true)}
                        >
                            {list(anchor)}
                        </SwipeableDrawer>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}