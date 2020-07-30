import React from 'react'
import { Doughnut } from 'react-chartjs-2';

export default function Graphic(props) {

  return (
      <Doughnut
        data={{
          datasets: [{
            data: props.data,
            backgroundColor: props.colors
          }],
          labels: props.labels,
        }}
        options={{
          legend: {
            position: "bottom"
          }
        }}
      />
  )
}
