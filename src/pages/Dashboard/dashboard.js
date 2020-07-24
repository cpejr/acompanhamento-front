import React from 'react';
import { useStyles } from './styles';
import Menu from './menu';
import Graphic from './chart';
import { useEffect, useState } from 'react';

import { clientTemp, modelTemp, equipTemp, dataTemp } from './temp';

export default function Dashboard() {
  const margemPorcentagem = 0.8; //acima desta porcentagem entra em atenção, e abaixo ok

  const [situation, setSituation] = useState({
    ok: Number,
    revisao: Number,
    atencao: Number
  });
  const [values, setValues] = useState([{
    temperature: Number,
    current: Number,
    voltage: Number,
    id: String
  }])
  const [limits, setLimits] = useState([{
    temperatureLimit: Number,
    currentLimit: Number,
    voltageLimit: Number,
    modelName: String
  }])
  const [totalEquipment, setTotalEquipment] = useState(Number);

  useEffect(() => { //total de equipamentos
    const quantidade = dataTemp.data.length;

    setTotalEquipment(quantidade);
    console.log(quantidade)
  }, []);

  useEffect(() => { //seta valores 
    const data = dataTemp.data;

    const valuesData = data.map(equipment => {
      return {
        temperature: equipment.temperature,
        current: equipment.current,
        voltage: equipment.voltage,
        id: equipment.id
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
        voltageLimit: model.voltageLimit,
        modelName: model.modelName
      }
    })

    setLimits(limitsData)
  }, [])

  useEffect(() => { //configura situações

    let numOk = 0;
    let numAtencao = 0;
    let numRevisao = 0;

    function defineSituacao(limit, value) {
      if (value >= limit) numRevisao++;
      else if (value >= (limit * margemPorcentagem) && value < limit) numAtencao++;
      else numOk++;
    }

    values.map(equipValue => {
      const limitTemperature = limits[0].temperatureLimit;
      const valueTemperatura = equipValue.temperature;

      defineSituacao(limitTemperature, valueTemperatura)
    })

    const situationData = {
      ok: numOk,
      revisao: numRevisao,
      atencao: numAtencao
    };
    setSituation(situationData);
  }, [limits, values])

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu />
      <div className={classes.sidebar}></div>
      <div className={classes.tittle}>
        Situação das Bombas {`[quantidade de bombas: ${totalEquipment}]`}
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
