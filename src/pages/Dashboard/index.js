import React from 'react'
import {
    CssBaseline,
} from '@material-ui/core';

import { useStyles } from './styles'

export default function Dashboard() {

    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />
            <div className={classes.root}>
                    Página de dashboard
            </div>
        </React.Fragment>
    )
}