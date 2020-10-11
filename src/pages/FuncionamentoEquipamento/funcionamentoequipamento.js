import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import {
  CssBaseline,
  Grid,
  CircularProgress,
  Backdrop,
  Tooltip
} from '@material-ui/core';
import { getTime, parseISO } from 'date-fns';

import { useStyles } from './funcionamentoequipamentoStyle'
import ChartTable from './chartTable';
import Table from './table';
import Chart from './chart';

export default function FuncionamentoEquipamento() {
  const classes = useStyles();
  // const { id } = useParams();
  const id = "9c662f70-041c-11eb-a5d4-d9a33cd11de3"

  const [equipmentData, setEquipmentData] = useState([]);
  const [equipment, setEquipment] = useState({});
  const [selectedChart, setSelectedChart] = useState("temperature");
  const [periodChart, setPeriodChart] = useState({
    type: "mounth",
    value: 1,
  })
  const [dataToShow, setDataToShow] = useState({
    type: selectedChart,
    tempMax: 0,
    currMax: 0,
    voltMax: 0,
    tempMin: 0,
    currMin: 0,
    voltMin: 0,
    tempLastAlert: getTime(parseISO('2020-09-16')),
    currLastAlert: getTime(parseISO('2020-10-09')),
    voltLastAlert: getTime(parseISO('2020-08-01')),
    worktime: getTime(parseISO('2020-08-12')),
    situation: "",
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get datas of equipment
    api.get(`data/equipament/${id}`).then(response => {
      const data = response.data.data;
      setEquipmentData(data)
    })

    // get equipment
    api.get(`equipment/${id}`).then(response => {
      setEquipment(response.data.equipment[0])
    })

    setLoading(false)
  }, [id]);

  useEffect(() => {
    var tempMax = 0;
    var tempMin = 0;
    var currMax = 0;
    var currMin = 0;
    var voltMax = 0;
    var voltMin = 0;
    if (equipmentData[0]) {
      tempMax = Math.max(...equipmentData.map(data => data.temperature))
      tempMin = Math.min(...equipmentData.map(data => data.temperature))
      currMax = Math.max(...equipmentData.map(data => data.current))
      currMin = Math.min(...equipmentData.map(data => data.current))
      voltMax = Math.max(...equipmentData.map(data => data.voltage))
      voltMin = Math.min(...equipmentData.map(data => data.voltage))
    }
    const data = {
      type: selectedChart,
      tempMax,
      tempMin,
      currMax,
      currMin,
      voltMax,
      voltMin,
      situation: equipment.situation,
      // worktime: equipment.work_time
    }
    setDataToShow(prev => ({ ...prev, ...data })) //first time
  }, [equipment, equipmentData, selectedChart]);

  if (loading || Object.keys(dataToShow).length === 0) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  const changeDataToShow = (property, value) => {
    setDataToShow(prev => ({ ...prev, [property]: value }))
  }

  const handleChangeChartData = (type) => {
    setSelectedChart(type)
    changeDataToShow("type", type)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container>
        <Grid container className={classes.chartContainer}>
          <Grid item md={9} xs={12} className={classes.chart}>
            <Chart
              dataToShow={dataToShow}
              equipmentData={equipmentData}
              selectedChart={selectedChart}
              periodChart={periodChart} />
          </Grid>
          <Grid item md={3} xs={12} className={classes.chartTable}>
            <ChartTable
              dataToShow={dataToShow}
              periodChart={periodChart}
              setPeriodChart={setPeriodChart} />
          </Grid>
          <Grid item md={12} xs={12} className={classes.chartButtons}>
            <Tooltip title="Temperatura" arrow>
              <input type="radio" onChange={() => handleChangeChartData("temperature")}
                checked={selectedChart === "temperature"} />
            </Tooltip>
            <Tooltip title="Corrente" arrow>
              <input type="radio" onChange={() => handleChangeChartData("current")}
                checked={selectedChart === "current"} />
            </Tooltip>
            <Tooltip title="Tensão" arrow>
              <input type="radio" onChange={() => handleChangeChartData("voltage")}
                checked={selectedChart === "voltage"} />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} className={classes.table}>
          <Table equipment={equipment} />
        </Grid>
      </Grid>
    </div>
  )
}
