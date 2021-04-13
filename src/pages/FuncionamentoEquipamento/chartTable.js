import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Grid,
  Select,
  MenuItem,
  TextField,
  FormControl,
  Button
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
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

export default function ChartTable({ dataToShow, setPeriodChart, periodChart }) {
  const classes = useStyles();

  const [tempSelectedChart, setTempSelectedChart] = useState(periodChart)

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

  const handleChangeTempPeriod = (e) => {
    const { name, value } = e.target;
    setTempSelectedChart(prev => ({ ...prev, [name]: value }))
  }

  const sendChangeOfPeriod = () => {
    setPeriodChart(tempSelectedChart)
  }

  return (
    <Grid container>
      <CssBaseline />

      <Grid xs={6} md={12} item className={classes.itemTable}>
        <h2 className={classes.itemTitle}>Período</h2>
        <Box display="flex" justifyContent="space-around" alignItems="center">
          <TextField
            type="number"
            name="value"
            value={tempSelectedChart.value}
            onChange={handleChangeTempPeriod}
            className={classes.inputPeriod}
            disabled={tempSelectedChart.type === 'all'}
          />
          <FormControl
            className={classes.selectPeriod}
          >
            <Select
              value={tempSelectedChart.type}
              onChange={handleChangeTempPeriod}
              name="type"
            >
              <MenuItem value="hour">horas</MenuItem>
              <MenuItem value="day">dias</MenuItem>
              <MenuItem value="mounth">meses</MenuItem>
              <MenuItem value="year">anos</MenuItem>
              <MenuItem value="all">tudo</MenuItem>
            </Select>
          </FormControl>
          <Button
            onClick={sendChangeOfPeriod}
            className={classes.sendChange}
          >
            <CachedIcon />
          </Button>
        </Box>
      </Grid>
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
