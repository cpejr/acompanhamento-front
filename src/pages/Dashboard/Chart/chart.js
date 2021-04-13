import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import history from "../../../history";

export default function Graphic(props) {
  return (
    <Doughnut
      data={{
        datasets: [{
          data: props.data,
          backgroundColor: props.colors,
        }],
        labels: props.labels
      }}
      options={{
        legend: {
          position: "bottom"
        },
        events: ['click', 'mousemove'],
        onClick: (event, activeElements) => {
          var activePoints = activeElements;

          if (activePoints[0]) {
            var chartData = activePoints[0]['_chart'].config.data;
            var idx = activePoints[0]['_index'];
            var label = chartData.labels[idx];
            history.push(`/listagemequipamento?situation=${label}`);
          }
        }
      }}
    />
  )
}
