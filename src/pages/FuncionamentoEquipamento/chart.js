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
  console.log(limiteModel);
  const notVibrationData = [
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
          case "vibration":
            return limiteModel.max_vibra;
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
          case "vibration":
            return limiteModel.min_vibra; 
          default:
            return limiteModel.min_voltage;
        }
      }),
      fill: false,
    }
  ]
  const vibrationData = [
    {
      label: 'Eixo X',
      borderColor: "blue",
      data: equipmentData.map(data => data[selectedChart].x_axis),
      fill: false,
      lineTension: 0.25
    },
    {
      label: 'Eixo Y',
      borderColor: "green",
      data: equipmentData.map(data => data[selectedChart].y_axis),
      fill: false,
      lineTension: 0.25
    },
    {
      label: 'Eixo Z',
      borderColor: "grey",
      data: equipmentData.map(data => data[selectedChart].z_axis),
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
          case "vibration":
            return limiteModel.max_vibra;
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
          case "vibration":
            return limiteModel.min_vibra; 
          default:
            return limiteModel.min_voltage;
        }
      }),
      fill: false,
    }
  ]
  useEffect(() => {
    const title = () => {
      switch (dataToShow.type) {
        case "temperature":
          return "Temperatura";
        case "current":
          return "Corrente";
        case "voltage":
          return "Tensão";
        case "vibration":
          return "Vibração";

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

          datasets : selectedChart === "vibration" ? vibrationData : notVibrationData 
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
