import React from 'react';
import { CssBaseline } from "@material-ui/core"
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useStyles } from './styles';
import { FiMenu } from "react-icons/fi";
import Menu from './menu';
import Graphic from './chart';

export default function Dashboard(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Menu />
            <div className={classes.sidebar}></div>
            <div className={classes.graphic}>
                <div className={classes.graphic1}>
                    <Graphic data={[20, 80]} colors={['red', "gray"]} labels={["danger"]} />
                </div>
                <div className={classes.graphic1}>
                    <Graphic data={[60, 40]} colors={['yellow', "gray"]} labels={["caution"]} />
                </div>
                <div className={classes.graphic1}>
                    <Graphic data={[90, 10]} colors={['green', "gray"]} labels={["good"]} />
                </div>
            </div>
        </div >
    )
}