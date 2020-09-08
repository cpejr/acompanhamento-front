import React from 'react'
import { Doughnut } from 'react-chartjs-2';

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
          events: ['click'],
          onClick: (event) => {
            var activePoints = Doughnut.getElementAtEvent(event);

            if (activePoints[0]) {
              var chartData = activePoints[0]['_chart'].config.data;
              var idx = activePoints[0]['_index'];

              var label = chartData.labels[idx];
              var value = chartData.datasets[0].data[idx];

              var url = "http://example.com/?label=" + label + "&value=" + value;
              alert(url);
            }
          }
        }}
      />
    )
  }