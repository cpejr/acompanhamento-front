import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Grid,
  TextField,
  Button
} from '@material-ui/core';
import CachedIcon from '@material-ui/icons/Cached';
import { useStyles } from './funcionamentoequipamentoStyle';
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
  const [selectedPeriod, setSelectedPeriod] = useState(periodChart);

  const GraphInfo = ({ title, value, unity }) => (
    <Grid xs={6} md={12} item className={classes.itemTable}>
      <h2 className={classes.itemTitle}>{title}</h2>
      <p className={classes.itemBody}>{
        value === "worktime" || value === "voltLastAlert" || value === "currLastAlert" || value === "tempLastAlert" ?
          format(dataToShow[value], 'dd/MM/yyyy') :
          dataToShow[value]  
      } {unity}</p>
    </Grid>
  )
  const handlePeriodChange = (e) => {

    const { name, value } = e.target;
    setSelectedPeriod(prev => ({ ...prev, [name]: new Date(value) }));
  }

  const sendChangeOfPeriod = () => {

    if (!selectedPeriod.datebegin || !selectedPeriod.dateend) {
      let aux = selectedPeriod;

      aux.datebegin = aux.datebegin ? aux.datebegin : new Date("01/01/1900");
      aux.dateend = aux.dateend ? aux.dateend : new Date(Date.now());
      setPeriodChart(aux);
    } else setPeriodChart(selectedPeriod);
  }

  const handlePeriodReset = () => {

    setPeriodChart(prev => ({
      ...prev,
      datebegin: new Date("01/01/1900"),
      dateend: new Date(Date.now())
    }));
  }

  return (
    <Grid container>
      <CssBaseline />

      <Grid xs={6} md={12} item className={classes.itemTable}>

        <h2 
          className={classes.itemTitle} 
          style={{ marginBottom: "16px" }}
        >
          Filtros
        </h2>

        <Box display="block" alignItems="center" style={{ maxWidth: "100%" }} >

          <TextField
            name="datebegin"
            onChange={handlePeriodChange}
            label="Data Inicial"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ width: "75%" }}
          />

          <TextField
            name="dateend"
            onChange={handlePeriodChange}
            label="Data Final"
            type="datetime-local"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginTop: "16px", width: "75%" }}
          />

          <Button
            onClick={sendChangeOfPeriod}
            className={classes.sendChange}
          >
            <CachedIcon />
          </Button>
        </Box>

        <Button
          className={classes.buttonRegister}
          color="primary"
          variant="outlined"
          onClick={handlePeriodReset}
          style={{ textTransform: "none", marginTop: "16px" }}
        >
          Mostrar período completo
        </Button>

      </Grid>
      {
        elementsOfTable[dataToShow.type]
          .concat(elementsFixedOfTable)
          .map((props) => (
            <GraphInfo key={props.title} {...props} />
          ))
      }
    </Grid>
  )
}
