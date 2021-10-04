import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography
} from '@material-ui/core';
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
  ],
  vibration: [
    {
      title: "Máxima vibração medida",
      value: "vibraMax",
      unity: "m/s²"
    },
    {
      title: "Mínima vibração medida",
      value: "vibraMin",
      unity: "m/s²"
    },
    {
      title: "Último alerta de vibração",
      value: "vibraLastAlert",
      unity: ""
    }
  ]
}

const elementsFixedOfTable = [
  {
    title: "Data de ativação",
    value: "worktime",
    unity: ""
  },
  {
    title: "Situação",
    value: "situation",
    unity: "",
  },
]

export default function ChartTable({ dataToShow, setPeriodChart, periodChart, setShowLabel, showLabel }) {

  const classes = useStyles();
  const [selectedPeriod, setSelectedPeriod] = useState(periodChart);
  const GraphInfo = ({ title, value, unity }) => (
    <div className={classes.tableData} >
      <h2 className={classes.itemTitle}>{title}</h2>
      <p className={classes.itemBody}>{
        value === "worktime" || value === "voltLastAlert" || value === "currLastAlert" || value === "tempLastAlert" || value === "vibraLastAlert" ?
          format(dataToShow[value], 'dd/MM/yyyy') :
          dataToShow[value]
      } {unity}</p>
    </div>
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
    <Grid container direction="row" style={{ width: "100%", display: "flex", flexDirection: "row" }} >
      <Grid item xs={12} sm={6} className={classes.itemTable}>

        <Typography style={{ marginBottom: "8px" }} >
          Filtro atual aplicado ao gráfico:
        </Typography>
        <Typography >
          Início: <b>{format(periodChart.datebegin ? periodChart.datebegin : new Date("01-01-1970"), "dd/MM/yyyy HH:mm")}</b>
        </Typography>
        <Typography >
          -
        </Typography>
        <Typography style={{ marginBottom: "8px" }} >
          Fim: <b>{format(periodChart.dateend ? periodChart.dateend : Date.now(), "dd/MM/yyyy HH:mm")}</b>
        </Typography>

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
            style={{ width: "100%" }}
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
            style={{ marginTop: "16px", width: "100%" }}
          />
        </Box>

        <Button
          className={classes.buttonApply}
          variant="contained"
          onClick={sendChangeOfPeriod}
          style={{ textTransform: "none", marginTop: "16px" }}
        >
          Aplicar filtros
        </Button>

        <Button
          className={classes.buttonRegister}
          color="primary"
          variant="outlined"
          onClick={handlePeriodReset}
          style={{ textTransform: "none", marginTop: "16px" }}
        >
          Mostrar período completo
        </Button>

        <Button
          className={classes.buttonAxis}
          variant="outlined"
          onClick={() => setShowLabel(prev => !prev)}
          style={{ textTransform: "none", marginTop: "16px" }}
        >
          {showLabel ? "Remover escala de tempo" : "Mostrar escala de tempo"}
        </Button>
      </Grid>

      <Grid item xs={12} sm={6} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }} >
        {
          elementsOfTable[dataToShow.type]
            .concat(elementsFixedOfTable)
            .map((props) => (
              <GraphInfo key={props.title} {...props} />
            ))
        }
      </Grid>


    </Grid>
  )
}
