import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from "react-router-dom"

import {
  Button,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import api from '../../services/api';
import moment from "moment";
import ordenar from '../../services/ordenar';
import { DataContext } from '../../context/DataContext';
import { useStyles } from './listagemEquipamentoStyle';
import StickyHeadTable from './Tabela';

export default function ListagemEquipamento() {
  const classes = useStyles();
  const [filterby, setFilterby] = useState("client");

  // const query = new URLSearchParams(useLocation().search);
  // const situation = query.get('situation');

  // const allEquipment = useContext(DataContext).equipmentsList;
  // const equipmentsOriginal = situation ?
  //   allEquipment.filter(equipment => equipment.situation === situation) :
  //   allEquipment;

  const allEquipment = useContext(DataContext).equipmentsList;
  const [equipmentsOriginal, setEquipmentsOriginal] = useState(allEquipment);

  useEffect(() => {
    api.get('equipment/index')
      .then(equipment => {
        const equipments = equipment.data.equipment
        setEquipmentsOriginal(equipments);
        setEquipmentsListToDisplay(equipments);
      })
      .catch(err => {
        console.error("Backend is not working", err);
      });
  }, [])

  const [ordem, setOrdem] = useState({ alfabetica: false, by: "last_collect_date" });
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState(equipmentsOriginal);

  function FindEquipment(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

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

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Equipamentos
          </Typography>
          <Button component={Link} to="/cadastroequipamento" className={classes.buttonAdd}>
            Adicionar Novo
          </Button>
        </div>
        <div className={classes.searchplusfilter}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.searchInput}>
              <InputBase className={classes.placeholder}
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
            <Select className={classes.selectItens}
              value={filterby}
              onChange={(e) => setFilterby(e.target.value)}
              variant='outlined'
            >
              <MenuItem value="client">Cliente</MenuItem>
              <MenuItem value="model_equipment">Modelo</MenuItem>
              <MenuItem value="id_equipment">Nº série</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            equipmentsListToDisplay={
              ordenar(equipmentsListToDisplay, ordem.by, ordem.alfabetica,
                ordem.by === "updateAt" ? true : false)
                .map((equipment) => {
                  var formattedDate = getRequiredDateFormat(equipment.updatedAt)
                  return {
                    id_equipment: equipment.id_equipment,
                    equipment_model: equipment.equipment_model,
                    cpf_client: equipment.cpf_client,
                    updatedAt: formattedDate,
                  }
                })
            }
            setOrdem={setOrdem}
            ordem={ordem} />
        </div>
      </div>
    </React.Fragment>
  )
}
