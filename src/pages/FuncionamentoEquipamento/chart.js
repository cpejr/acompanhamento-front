import React, { useEffect, useState } from 'react';
import {
  CssBaseline,
  useMediaQuery
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { useStyles } from './funcionamentoequipamentoStyle';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default function ({ dataToShow, equipmentData, selectedChart, limiteModel }) {

  const classes = useStyles();
  const [chartTitle, setChartTitle] = useState("");
  const isDesktop = useMediaQuery("(min-width:960px)");

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

  return (
    <React.Fragment>
      <CssBaseline />

      <h2 className={classes.title}>{chartTitle}</h2>
      <p className={classes.subtitle}>
        { format(new Date(), "PPPP", { locale: ptBR }) }
      </p>

      {!equipmentData[0] && 
        <p className={classes.chartAlert}>
          Não há dados no período selecionado.
        </p>}

      <Line
        data={{
          labels: equipmentData.map(data => {

            if (isDesktop) {
              return format(new Date(data.updatedAt), "dd-MM HH:mm");
            } else return format(new Date(data.updatedAt), "HH:mm");
            
          }),
          datasets: [
            {
              label: 'Atual',
              borderColor: "blue",
              data: equipmentData.map(data => data[selectedChart]),
              fill: false,
              lineTension: 0.25
            },
            {
              label: 'Máximo do Modelo',
              borderColor: "red",
              data: equipmentData.map(() => {
                switch (selectedChart) {
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
                switch (selectedChart) {
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
          ],
        }}
        options={{
          scales: {
            xAxes: [{
              ticks: {
                autoSkip: false,
                minRotation: isDesktop ? 45 : 80
              }
            }]
          },
          responsive: true,
          legend: {
            labels: {
              boxWidth: isDesktop ? 30 : 10,
              fontSize: isDesktop ? 12 : 10
            }
          },
          
        }}
      />
    </React.Fragment>
  )
}
