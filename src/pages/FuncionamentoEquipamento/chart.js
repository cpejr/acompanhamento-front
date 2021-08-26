import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { useStyles } from './funcionamentoequipamentoStyle';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ({ dataToShow, equipmentData, selectedChart, periodChart, limiteModel }) {
  const classes = useStyles();

  const [chartTitle, setChartTitle] = useState("");

  useEffect(() => {
    const title = () => {
      switch (dataToShow.type) {
        case "temperature":
          return "Temperatura";
        case "current":
          return "Corrente";
        case "voltage":
          return "Tensão";

        default:
          return dataToShow.type;
      }
    }
    setChartTitle(title);
  }, [dataToShow]);

  const dateLabalFormat = () => {
    switch (periodChart.type) {
      case "hour":
        return "HH:mm";
      case "day":
        return "dd/MM";
      case "mounth":
        return "dd/MM";
      case "year":
        return "MM/yyyy";
      case "all":
        return "MM/yyyy";

      default:
        return "dd/MM";
    }
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <h2 className={classes.title}>{chartTitle}</h2>
      <p className={classes.subtitle}>
        {format(new Date(), "PPPP", { locale: ptBR })}
      </p>

      {!equipmentData[0] && <p className={classes.chartAlert}>
        Não há dados no período selecionado...
      </p>}
      {console.log(selectedChart,"opa")}
      <Line
        data={{
          labels: equipmentData.map(data =>
            format(parseISO(data.createdAt), dateLabalFormat())
          ),
          datasets: [
            {
              label: 'Atual',
              borderColor: "blue",
              data: equipmentData.map(data => data[selectedChart]),
              fill: false,
            },
            {
              label: 'Máximo do Modelo',
              borderColor: "red",
              data: equipmentData.map(() => {
                switch (selectedChart){
                  case "temperature":
                    return limiteModel.max_temp;
                  case "current":
                    return limiteModel.max_current;
                  default:
                    return limiteModel.max_voltage;
                }
              }),
              fill: false,
            },
            {
              label: 'Minimo do Modelo',
              borderColor: "orange",
              data: equipmentData.map(() => {
                switch (selectedChart){
                  case "temperature":
                    return limiteModel.min_temp;
                  case "current":
                    return limiteModel.min_current;
                  default:
                    return limiteModel.min_voltage;
                }
              }),
              fill: false,
            }
          ]
        }}
        options={{}}
      />
    </React.Fragment>
  )
}
