import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import api from "../../services/api";
import moment from "moment";
import ordenar from "../../services/ordenar";
import { useStyles } from "./listagemEquipamentoStyle";
import StickyHeadTable from "./Tabela";

export default function ListagemEquipamento() {
  const classes = useStyles();
  const [filterby, setFilterby] = useState("id_equipment");
  const [equipmentsOriginal, setEquipmentsOriginal] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [loading, setLoading] = useState({
    model: true,
    equipments: true,
    changeNameModel: true,
    setDisplay: true,
  });
  const [ordem, setOrdem] = useState({
    alfabetica: false,
    by: "last_collect_date",
  });
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState();

  const query = new URLSearchParams(useLocation().search);
  const situation = query.get("situation");

  useEffect(() => {
    const url = situation
      ? `equipment/find_situation/${situation}`
      : "equipment/index";
    api
      .get(url)
      .then((equipment) => {
        var equipments = equipment.data.equipment;
        setEquipmentsOriginal(equipments);
        setEquipmentsListToDisplay(equipments);
        setLoading((prev) => ({ ...prev, equipments: false }));
      })
      .catch((err) => {
        console.error(
          "Não foi possivel estabelecer conecção com o backend",
          err
        );
      });

    api
      .get(`/model/index`)
      .then((model) => {
        setModelList(model.data.data);
        setLoading((prev) => ({ ...prev, model: false }));
      })
      .catch((err) => {
        console.error(
          "Não foi possivel estabelecer conecção com o backend",
          err
        );
      });
  }, [situation]);

  useEffect(() => {
    setEquipmentsOriginal((velhosEquip) => {
      return velhosEquip.map((equipment) => {
        if (modelList[0].id) {
          equipment.equipment_model = modelList.find(
            (model) => model.id === equipment.id_model
          ).modelName;
        }
        return equipment;
      });
    });
    setLoading((prev) => ({ ...prev, changeNameModel: false }));
  }, [modelList]);

  useEffect(() => {
    setEquipmentsListToDisplay(equipmentsOriginal);
    setLoading((prev) => ({ ...prev, setDisplay: false }));
  }, [equipmentsOriginal]);

  function FindEquipment(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), "g");

      equipmentsOriginal.forEach((item) => {
        var probable = item[filterby].toLowerCase().match(filteredEquipment);
        if (probable) {
          equipmentsListToDisplay.push(item);
        }
      });
      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
  }

  function getRequiredDateFormat(timeStamp, format = "DD/MM/YYYY") {
    return moment(timeStamp).format(format);
  }

  if (
    loading.model ||
    loading.equipments ||
    loading.changeNameModel ||
    loading.setDisplay
  ) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Equipamentos
          </Typography>
          <Button
            component={Link}
            to="/cadastroequipamento"
            className={classes.buttonAdd}
          >
            Adicionar Novo
          </Button>
        </div>
        <div className={classes.searchplusfilter}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.searchInput}>
              <InputBase
                className={classes.placeholder}
                placeholder="Procurar equipamento"
                onChange={(e) => FindEquipment(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
              />
            </div>
          </div>
          <FormControl className={classes.filter}>
            <Select
              className={classes.selectItens}
              value={filterby}
              onChange={(e) => setFilterby(e.target.value)}
              variant="outlined"
            >
              <MenuItem value="cpf_client">Cliente</MenuItem>
              <MenuItem value="equipment_model">Modelo</MenuItem>
              <MenuItem value="id_equipment">Nº série</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            equipmentsListToDisplay={ordenar(
              equipmentsListToDisplay,
              ordem.by,
              ordem.alfabetica,
              ordem.by === "updateAt" ? true : false
            ).map((equipment) => {
              var formattedDate = getRequiredDateFormat(equipment.updatedAt);
              return {
                id: equipment.id,
                id_equipment: equipment.id_equipment,
                equipment_model: equipment.equipment_model,
                cpf_client: equipment.cpf_client,
                updatedAt: formattedDate,
              };
            })}
            setOrdem={setOrdem}
            ordem={ordem}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
