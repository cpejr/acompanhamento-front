import React from 'react';
import { useStyles } from './styles';
import Menu from './menu';
import Graphic from './chart';

export default function Dashboard() {

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