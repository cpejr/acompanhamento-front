import React from 'react';

import {Typography} from "@material-ui/core";
import { useStyles } from '../Dashboard/dashboardStyles';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <Typography variant="h3" className={classes.title}>
      Lista de Usuários
    </Typography>

    </div>
  )
}