import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import api from '../../services/api';
import {
  CssBaseline,
  Grid
} from '@material-ui/core';
import { useStyles } from './funcionamentoequipamentoStyle'

export default function FuncionamentoEquipamento() {
  const classes = useStyles();
  const { id } = useParams()

  const [equipmentData, setEquipmentData] = useState([]);

  // useEffect(() => {
  //   api.get('')
  // }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Grid container className={classes.chartContainer}>
          <Grid item md="9" className={classes.chart}>
            Gráfico
          </Grid>
          <Grid item md="3" className={classes.chartTable}>
            Tabela do gráfico
          </Grid>
          <Grid item md="12" className={classes.chartButtons}>
            Mudar gráfico
          </Grid>
        </Grid>
        <Grid item md="12" className={classes.table}>
          Tabela do equipamento
        </Grid>
      </Grid>
    </div>
  )
}
