import React from 'react';
import { useStyles } from './styles';
import Menu from './menu';
import Graphic from './chart';
import { useEffect, useState } from 'react';

import { modelTemp, dataTemp } from './temp';
import { Grid, Typography } from '@material-ui/core';

export default function Dashboard() {
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
    let numOk = 0; let numAtencao = 0; let numRevisao = 0;

    function defineSituacao(valueEquipment, limitModel) {
      // Parametros para analise de valores. Ex.:
      // se o parametro vale 0.8 o equipamento estará em situação de atenção 
      // quando chegar em 80% do limite que ele pode alcançar 
      const paramTEMP = 0.8;
      const paramVOLT = 0.8;
      const paramCURR = 0.8;

      function analisaTEMP(value, limit, param) {
        if (value > limit) return "revisao";
        else if (value >= (limit * param) && value <= limit) return "atencao";
        else return "ok";
      }
      function analisaVOLT(value, limit, param) {
        if (value > limit) return "revisao";
        else if (value >= (limit * param) && value <= limit) return "atencao";
        else return "ok";
      }
      function analisaCURR(value, limit, param) {
        if (value > limit) return "revisao";
        else if (value >= (limit * param) && value <= limit) return "atencao";
        else return "ok";
      }

      const sitTEMP = analisaTEMP(
        valueEquipment.temperature,
        limitModel.temperatureLimit,
        paramTEMP);

      const sitVOLT = analisaVOLT(
        valueEquipment.voltage,
        limitModel.voltageLimit,
        paramVOLT);

      const sitCURR = analisaCURR(
        valueEquipment.current,
        limitModel.currentLimit,
        paramCURR);

      let sitGeral = String;

      // a pior situação será a situação geral
      if (sitTEMP === "revisao" | sitVOLT === "revisao" | sitCURR === "revisao") sitGeral = "revisao";
      else if (sitTEMP === "atencao" | sitVOLT === "atencao" | sitCURR === "atencao") sitGeral = "atencao";
      else if (sitTEMP === "ok" | sitVOLT === "ok" | sitCURR === "ok") sitGeral = "ok";

      // atribui sitGeral as devidas variaveis 
      if (sitGeral === "revisao") numRevisao++;
      else if (sitGeral === "atencao") numAtencao++;
      else if (sitGeral === "ok") numOk++;
    }

    values.map(equipValue => {
      defineSituacao(equipValue, limits[0]);
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
      <Typography variant="h3" align="center" className={classes.title}>
        Situação das Bombas
      </Typography>

      <Grid container className={classes.graphics}>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[situation.revisao, totalEquipment - situation.revisao]}
            colors={['red', "gray"]}
            labels={["Revisão"]} />
        </Grid>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[situation.atencao, totalEquipment - situation.atencao]}
            colors={['yellow', "gray"]}
            labels={["Atenção"]} />
        </Grid>
        <Grid className={classes.graphic} item xs={12} sm={12} md={4} xl={4}>
          <Graphic
            data={[situation.ok, totalEquipment - situation.ok]}
            colors={['green', "gray"]}
            labels={["OK"]} />
        </Grid>
      </Grid>

      {/* <div className={classes.graphic}>
        <div className={classes.graphic1}>
        </div>
        <div className={classes.graphic1}>
        </div>
        <div className={classes.graphic1}>
        </div>
      </div> */}

    </div >
  )
}
