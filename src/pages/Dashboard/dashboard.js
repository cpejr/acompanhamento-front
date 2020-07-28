import React from 'react';
import { useStyles } from './styles';
import Menu from './menu';
import Graphic from './chart';
import { useEffect, useState } from 'react';

import { clientTemp } from './temp';
import DATA from './data'
import { Grid, Typography } from '@material-ui/core';

export default function Dashboard() {

  const [sitNum, setSitNum] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });

  const [totalEquipment, setTotalEquipment] = useState();

  const [user] = useState(clientTemp.client.name);

  useEffect(() => { //total de equipamentos
    const quantidade = DATA.length;

    setTotalEquipment(quantidade);
  }, []);

  useEffect(() => { //
    let numOk = 0; let numAtencao = 0; let numRevisao = 0;

    DATA.map(equipment => {
      if (equipment.situation === "ok") numOk++;
      else if (equipment.situation === "atencao") numAtencao++;
      else if (equipment.situation === "revisao") numRevisao++;
    })

    setSitNum({
      ok: numOk,
      revisao: numRevisao,
      atencao: numAtencao
    })
  }, [])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu user={user} />
      <Typography variant="h3" align="center" className={classes.title}>
        Situação das Bombas
      </Typography>

      <Grid container className={classes.graphics}>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[sitNum.revisao, totalEquipment - sitNum.revisao]}
            colors={['red', "gray"]}
            labels={["Revisão"]} />
        </Grid>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[sitNum.atencao, totalEquipment - sitNum.atencao]}
            colors={['yellow', "gray"]}
            labels={["Atenção"]} />
        </Grid>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[sitNum.ok, totalEquipment - sitNum.ok]}
            colors={['green', "gray"]}
            labels={["OK"]} />
        </Grid>
      </Grid>
    </div >
  )
}
