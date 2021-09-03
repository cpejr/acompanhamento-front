import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import api from "../../services/api";
import {
  CssBaseline,
  Grid,
  CircularProgress,
  Backdrop,
  Tooltip,
} from "@material-ui/core";
import {
  getTime,
  parseISO,
} from "date-fns";

import { useStyles } from "./funcionamentoequipamentoStyle";
import ChartTable from "./chartTable";
import Table from "./table";
import Chart from "./chart";
import { LoginContext } from '../../context/LoginContext';

export default function FuncionamentoEquipamento() {
  const { id } = useParams();
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();
  const classes = useStyles();

  const [equipmentData, setEquipmentData] = useState([]);
  const [equipmentDataWithoutPeriod, setEquipmentDataWithoutPeriod] = useState(
    []
  );
  const [equipment, setEquipment] = useState({});
  const [selectedChart, setSelectedChart] = useState("temperature");
  const [limiteModel, setLimiteModel] = useState({});
  const [periodChart, setPeriodChart] = useState({
    value: 1
  });
  const [dataToShow, setDataToShow] = useState({
    type: selectedChart,
    tempMax: 0,
    currMax: 0,
    voltMax: 0,
    tempMin: 0,
    currMin: 0,
    voltMin: 0,
    tempLastAlert: getTime(parseISO("2020-09-16")),
    currLastAlert: getTime(parseISO("2020-10-09")),
    voltLastAlert: getTime(parseISO("2020-08-01")),
    worktime: getTime(parseISO("2020-08-12")),
    situation: "",
  });
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // get datas of equipment
    api.get(`data/equipment/${id}`).then((response) => {
      const data = response.data.data;
      if (data) {
        data.sort((a, b) => {
          return new Date(a.updatedAt) - new Date(b.updatedAt)
        });
      }
      setEquipmentDataWithoutPeriod(data);
    });

    // get equipment
    api.get(`equipment/${id}`, { headers: { authorization: `Bearer ${accessToken}` } }).then((response) => {
      setEquipment(response.data.equipment[0]);
    });
  }, [accessToken, id]);

  useEffect(() => {
    // get limits of model
    api
      .get(`model/${equipment.id_model}`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {

        if (response.data.model) {
          const min_current = response.data.model.min_current;
          const max_current = response.data.model.max_current;
          const min_voltage = response.data.model.min_voltage;
          const max_voltage = response.data.model.max_voltage;
          const min_temp = response.data.model.min_temp;
          const max_temp = response.data.model.max_temp;
  
          setLimiteModel({
            min_current,
            max_current,
            min_voltage,
            max_voltage,
            min_temp,
            max_temp,
          });
        }
      })
      .catch((err) => console.error(err));

    setLoading(false);
  }, [accessToken, equipment]);

  useEffect(() => {

    if (periodChart.datebegin && periodChart.dateend && equipmentDataWithoutPeriod) {

      let filteredDates = equipmentDataWithoutPeriod;

      filteredDates = filteredDates.filter((equipment) => {
        return new Date(equipment.updatedAt) >= periodChart.datebegin && 
          new Date(equipment.updatedAt) <= periodChart.dateend
      })
      setEquipmentData(filteredDates);
    } else setEquipmentData(equipmentDataWithoutPeriod);
    
  }, [periodChart, equipmentDataWithoutPeriod])

  useEffect(() => {
    var tempMax = 0;
    var tempMin = 0;
    var currMax = 0;
    var currMin = 0;
    var voltMax = 0;
    var voltMin = 0;
    if (equipmentData[0]) {
      tempMax = Math.max(...equipmentData.map((data) => data.temperature));
      tempMin = Math.min(...equipmentData.map((data) => data.temperature));
      currMax = Math.max(...equipmentData.map((data) => data.current));
      currMin = Math.min(...equipmentData.map((data) => data.current));
      voltMax = Math.max(...equipmentData.map((data) => data.voltage));
      voltMin = Math.min(...equipmentData.map((data) => data.voltage));
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
    };
    setDataToShow((prev) => ({ ...prev, ...data })); //first time
  }, [limiteModel, equipment, equipmentData, selectedChart]);

  if (loading || Object.keys(dataToShow).length === 0) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }

  const changeDataToShow = (property, value) => {
    setDataToShow((prev) => ({ ...prev, [property]: value }));
  };

  const handleChangeChartData = (type) => {
    setSelectedChart(type);
    changeDataToShow("type", type);
  };

  const changeColor = (type) => {
    if (selectedChart === type) return { background: "red", color: "white" };
    return { color: "black" };
  };

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
              limiteModel={limiteModel}
            />
          </Grid>
          <Grid item md={3} xs={12} className={classes.chartTable}>
            <ChartTable
              dataToShow={dataToShow}
              setPeriodChart={setPeriodChart}
              periodChart={periodChart}
            />
          </Grid>
        </Grid>
        <Grid item md={12} xs={12} className={classes.chartButtons}>
          <Tooltip title="Temperatura" arrow>
            <button
              onClick={() => handleChangeChartData("temperature")}
              style={changeColor("temperature")}
            >
              T
            </button>
          </Tooltip>
          <Tooltip title="Corrente" arrow>
            <button
              onClick={() => handleChangeChartData("current")}
              style={changeColor("current")}
            >
              C
            </button>
          </Tooltip>
          <Tooltip title="Tensão" arrow>
            <button
              onClick={() => handleChangeChartData("voltage")}
              style={changeColor("voltage")}
            >
              V
            </button>
          </Tooltip>
        </Grid>
        <Grid item md={12} xs={12} className={classes.table}>
          <Table equipment={equipment} />
        </Grid>
      </Grid>
    </div>
  );
}
