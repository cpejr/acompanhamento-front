import React from 'react';
import { useStyles } from './styles';
import Menu from './menu';
import Graphic from './chart';
import { useEffect, useState } from 'react';

import { clientTemp, modelTemp, equipTemp, dataTemp } from './temp';

export default function Dashboard() {
  const [situation, setSituation] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });

  const [values, setValues] = useState([])
  const [limits, setLimits] = useState([])
  const [totalEquipment, setTotalEquipment] = useState();

  useEffect(() => { //total de equipamentos
    const quantidade = clientTemp.client.equipment;

    setTotalEquipment(quantidade);
  }, []);

  useEffect(() => { //seta valores 
    const data = dataTemp.data;

    const valuesData = data.map(equipment => {
      return {
        temperature: equipment.temperature,
        current: equipment.current,
        voltage: equipment.voltage
      }
    })

    setValues(valuesData)
  }, [])

  useEffect(() => { //seta limites
    const data = modelTemp.data;

    const limitsData = data.map(model => {
      return {
        temperatureLimit: model.temperatureLimit,
        currentLimit: model.currentLimit,
        voltageLimit: model.voltageLimit
      }
    })

    setLimits(limitsData)
  }, [])

  useEffect(() => { //configura situações
    // const limitTemp = 20;
    // const valueTemp = 18;

    let numOk = 0;
    let numAtencao = 0;
    let numRevisao = 0;

    numOk++;
    numAtencao++;

    const situationData = {
      ok: numOk,
      revisao: numRevisao,
      atencao: numAtencao
    };

    setSituation(situationData);
  }, [])


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
          <Graphic
            data={[situation.revisao, totalEquipment - situation.revisao]}
            colors={['red', "gray"]}
            labels={["Revisão"]} />
        </div>
        <div className={classes.graphic1}>
          <Graphic
            data={[situation.atencao, totalEquipment - situation.atencao]}
            colors={['yellow', "gray"]}
            labels={["Atenção"]} />
        </div>
        <div className={classes.graphic1}>
          <Graphic
            data={[situation.ok, totalEquipment - situation.ok]}
            colors={['green', "gray"]}
            labels={["OK"]} />
        </div>
      </div>
    </div >
  )
}
