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
import { format } from 'date-fns';

const elementsOfTable = {
  temperature: [
    {
      title: "Máxima temperatura medida",
      value: "tempMax",
      unity: "°C"
    },
    {
      title: "Mínima temperatura medida",
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
      title: "Máxima corrente medida",
      value: "currMax",
      unity: "A"
    },
    {
      title: "Mínima corrente medida",
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
      title: "Máxima tensão medida",
      value: "voltMax",
      unity: "V"
    },
    {
      title: "Mínima tensão medida",
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
    title: "Data de tivação",
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
          format(dataToShow[value], 'dd/MM/yyyy') :
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
