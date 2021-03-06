import React, { useEffect, useState } from "react";
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
  subDays,
  subHours,
  subMonths,
  subYears,
} from "date-fns";

import { useStyles } from "./funcionamentoequipamentoStyle";
import ChartTable from "./chartTable";
import Table from "./table";
import Chart from "./chart";
import { isAfter } from "date-fns/esm";

export default function FuncionamentoEquipamento() {
  const { id } = useParams();
  const idDados = "bd23d030-0414-11eb-a5d4-d9a33cd11de3";

  const [equipmentData, setEquipmentData] = useState([]);
  const [equipmentDataWithoutPeriod, setEquipmentDataWithoutPeriod] = useState(
    []
  );
  const [equipment, setEquipment] = useState({});
  const [selectedChart, setSelectedChart] = useState("temperature");
  const [limiteModel, setLimiteModel] = useState({});
  const [periodChart, setPeriodChart] = useState({
    type: "mounth",
    value: 1,
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
      setEquipmentDataWithoutPeriod(data);
    });

    // get equipment
    api.get(`equipment/${id}`).then((response) => {
      setEquipment(response.data.equipment[0]);
    });
  }, [id]);

  useEffect(() => {
    // get datas of equipment
    api
      .get(`model/${equipment.id_model}`)
      .then((response) => {
        const current = response.data.model.currentLimit;
        const voltage = response.data.model.voltageLimit;
        const temperature = response.data.model.temperatureLimit;

        setLimiteModel({
          current,
          voltage,
          temperature,
        });
      })
      .catch((err) => console.error(err));

    setLoading(false);
  }, [equipment]);

  useEffect(() => {
    if (equipmentDataWithoutPeriod[0]) {
      var dateMin;
      switch (periodChart.type) {
        case "hour":
          dateMin = subHours(new Date(), periodChart.value);
          break;
        case "day":
          dateMin = subDays(new Date(), periodChart.value);
          break;
        case "mounth":
          dateMin = subMonths(new Date(), periodChart.value);
          break;
        case "year":
          dateMin = subYears(new Date(), periodChart.value);
          break;

        default:
          dateMin = new Date();
          break;
      }

      const dataFiltered =
        periodChart.type !== "all"
          ? equipmentDataWithoutPeriod.filter((data) => {
              const createdAt = parseISO(data.createdAt);
              return isAfter(createdAt, dateMin);
            })
          : equipmentDataWithoutPeriod;

      setEquipmentData(dataFiltered);
    }
  }, [equipmentDataWithoutPeriod, periodChart]);

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
      // worktime: equipment.work_time
    };
    setDataToShow((prev) => ({ ...prev, ...data })); //first time
  }, [equipment, equipmentData, selectedChart]);

  const classes = useStyles();

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

  console.log(dataToShow);

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
              periodChart={periodChart}
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
