import React from 'react';
import { useEffect, useState } from 'react';

import { useStyles } from './dashboardStyles';

import Graphic from './Chart';
import DATA from '../../services/data'

import { Typography } from '@material-ui/core';

export default function Dashboard({ isClient, user }) {

  const [sitNum, setSitNum] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });

  useEffect(() => {
    let numOk = 0; let numAtencao = 0; let numRevisao = 0;

    DATA.map(equipment => {
      if (equipment.situation === "ok") numOk++;
      else if (equipment.situation === "atencao") numAtencao++;
      else if (equipment.situation === "revisao") numRevisao++;
    });

    setSitNum({
      ok: numOk,
      revisao: numRevisao,
      atencao: numAtencao,
    })
  }, []);

  const title = isClient ? "Minhas Bombas" : "Situação das Bombas";

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h3" align="center" className={classes.title}>
        {title}
      </Typography>

      <div className={classes.graphic}>
        <Graphic
          data={[sitNum.revisao, sitNum.atencao, sitNum.ok]}
          colors={['#FE2121', '#5B59B4', '#43A047']}
          labels={["Revisão", "Atenção", "Ok"]} />
      </div>
    </div >
  )
}
