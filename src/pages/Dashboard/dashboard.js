import React from 'react';
import { useStyles } from './styles';
import Menu from './Menu';
import Graphic from './chart';
import { useEffect, useState } from 'react';

import { clientTemp } from './temp';
import DATA from './data'
import { Typography } from '@material-ui/core';

export default function Dashboard() {

  const [sitNum, setSitNum] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });

  const [user] = useState(clientTemp.client);

  useEffect(() => { //
    let numOk = 0; let numAtencao = 0; let numRevisao = 0;

    DATA.map(equipment => {
      if (equipment.situation === "ok") numOk++;
      else if (equipment.situation === "atencao") numAtencao++;
      else if (equipment.situation === "revisao") numRevisao++;
    })

    const total = numOk + numAtencao + numRevisao

    setSitNum({
      ok: (numOk / total) * 100,
      revisao: (numRevisao / total) * 100,
      atencao: (numAtencao / total) * 100
    })
  }, [])

  const isAdmin = user.tipo === "cliente" ? false : true

  const title = isAdmin ? "Situação das Bombas" : "Minhas Bombas";

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu user={user.name} isAdmin={isAdmin} />
      <Typography variant="h3" align="center" className={classes.title}>
        {title}
      </Typography>

      <div className={classes.graphic}>
        <Graphic
          data={[sitNum.revisao, sitNum.atencao, sitNum.ok]}
          colors={['red', 'blue', 'green']}
          labels={["Revisão", "Atenção", "Ok"]} />
      </div>
    </div >
  )
}
