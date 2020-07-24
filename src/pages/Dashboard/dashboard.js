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
            <div className={classes.tittle}>
                Situação das Bombas
            </div>
            <div className={classes.graphic}>
                <div className={classes.graphic1}>
                    <Graphic data={[10, 90]} colors={['red', "gray"]} labels={["Revisão"]} />
                </div>
                <div className={classes.graphic1}>
                    <Graphic data={[50, 50]} colors={['yellow', "gray"]} labels={["Atenção"]} />
                </div>
                <div className={classes.graphic1}>
                    <Graphic data={[40, 60]} colors={['green', "gray"]} labels={["OK"]} />
                </div>
            </div>
        </div >
    )
}