import React from 'react';
import {
  Box,
  CssBaseline,
  Select,
  MenuItem,
  Grid
} from '@material-ui/core';
import { useStyles } from './funcionamentoequipamentoStyle'
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNow } from 'date-fns/esm';

const elementsOfTable = {
  temperature: [
    {
      title: "Máxima temperatura",
      value: "tempMax",
      unity: "°C"
    },
    {
      title: "Mínima temperatura",
      value: "tempMin",
      unity: "°C"
    },
    {
      title: "Último alerta de temperatura",
      value: "tempLastAlert",
      unity: ""
    }
  ],
  current: [
    {
      title: "Máxima corrente",
      value: "currMax",
      unity: "A"
    },
    {
      title: "Mínima corrente",
      value: "currMin",
      unity: "A"
    },
    {
      title: "Último alerta de corrente",
      value: "currLastAlert",
      unity: ""
    }
  ],
  voltage: [
    {
      title: "Máxima tensão",
      value: "voltMax",
      unity: "V"
    },
    {
      title: "Mínima tensão",
      value: "voltMin",
      unity: "V"
    },
    {
      title: "Último alerta de tensão",
      value: "voltLastAlert",
      unity: ""
    }
  ]
}

const elementsFixedOfTable = [
  {
    title: "Tempo ligado",
    value: "worktime",
    unity: ""
  },
  {
    title: "Situação",
    value: "situation",
    unity: "",
  },
]

export default function ChartTable({ dataToShow, periodChart, setPeriodChart }) {
  const classes = useStyles();

  const Module = ({ title, value, unity }) => (
    <Grid xs={6} md={12} item className={classes.itemTable}>
      <h2 className={classes.itemTitle}>{title}</h2>
      <p className={classes.itemBody}>{
        value === "worktime" || value === "voltLastAlert" || value === "currLastAlert" || value === "tempLastAlert" ?
          formatDistanceToNow(dataToShow[value], { locale: ptBR }) :
          dataToShow[value]
      } {unity}</p>
    </Grid>
  )

  const PeriodModele = ({ number, type }) => (
    <Grid xs={6} md={12} item className={classes.itemTable}>
      <h2 className={classes.itemTitle}>Período</h2>
      <Box display="flex" justifyContent="space-around" alignItems="center">
        <p className={classes.itemBody}>{number}</p>
        <Select
          defaultValue={10}
          className={classes.selectPeriod}
          variant="standard"
          value={type}
          onChange={handleChangePeriod}
        >
          <MenuItem value={"hour"}>horas</MenuItem>
          <MenuItem value={"day"}>dias</MenuItem>
          <MenuItem value={"mounth"}>meses</MenuItem>
          <MenuItem value={"year"}> anos</MenuItem >
          <MenuItem value={"all"}>tudo</MenuItem>
        </Select >
      </Box>
    </Grid>
  )

  const handleChangePeriod = (e) => {
    const type = e.target.value;
    setPeriodChart(prev => ({ ...prev, type }))
  }

  return (
    <Grid container>
      <CssBaseline />

      <PeriodModele number={periodChart.value} type={periodChart.type} />

      {
        elementsOfTable[dataToShow.type]
          .concat(elementsFixedOfTable)
          .map((props) => (
            <Module key={props.title} {...props} />
          ))
      }
    </Grid >
  )
}