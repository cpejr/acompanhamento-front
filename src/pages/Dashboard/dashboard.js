import React from 'react';
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';

import { useStyles } from './dashboardStyles';
import { vermelhoPadrao, azulPadrao, verde } from '../../StylePadrao/stylePadrao';
import Graphic from './Chart';


export default function Dashboard(props) {
  const { isClient, data } = props

  const [sitNum, setSitNum] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });

  useEffect(() => { // define o número de bombas em cada situação
    let numOk = 0; let numAtencao = 0; let numRevisao = 0;

    data.forEach(equipment => {
      if (equipment.situation === "ok") numOk++;
      else if (equipment.situation === "atencao") numAtencao++;
      else if (equipment.situation === "revisao") numRevisao++;
    });

    setSitNum({
      ok: numOk,
      revisao: numRevisao,
      atencao: numAtencao,
    })
  }, [data]);

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
          colors={[vermelhoPadrao, azulPadrao, verde]}
          labels={["Revisão", "Atenção", "Ok"]} />
      </div>
    </div >
  )
}
