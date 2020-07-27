import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import { useStyles } from './styles';

export default function Graphic(props) {
  const classes = useStyles();

  return (
    <div className={classes.teste}>
      <Doughnut
        data={{
          datasets: [{
            data: props.data,
            backgroundColor: props.colors
          }],
          labels: props.labels
        }}
      />
    </div>
  )
}
