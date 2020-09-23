import React, { useState, useContext } from 'react';
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

import ordenar from '../../services/ordenar';
import { DataContext } from '../../context/DataContext';
import { useStyles } from './listagemEquipamentoStyle';
import StickyHeadTable from './Tabela';

export default function ListagemEquipamento() {
  const classes = useStyles();
  const [filterby, setFilterby] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const situation = query.get('situation');

  const allEquipment = useContext(DataContext).equipmentsList;
  const equipmentsOriginal = situation ?
    allEquipment.filter(equipment => equipment.situation === situation) :
    allEquipment;

  const [ordem, setOrdem] = useState({ alfabetica: false, by: "last_collect_date" });
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState(equipmentsOriginal);

  function FindEquipment(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

      equipmentsOriginal.forEach((item) => {
        var probable;
        switch (filterby) {
          case "ID":
            probable = item.id_equipment.toLowerCase().match(filteredEquipment);
            break;
          case "Modelo":
            probable = item.model_equipment.toLowerCase().match(filteredEquipment);
            break;
          case "Cliente":
            probable = item.client.toLowerCase().match(filteredEquipment);
            break;
        }
        if (probable) {
          equipmentsListToDisplay.push(item);
        }
      });
      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
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
            {/* <InputLabel
              color="primary"
              variant='filled'
            >
              Filtro
            </InputLabel> */}
            <Select className={classes.selectItens}
              value={filterby}
              onChange={(e) => setFilterby(e.target.value)}
              displayEmpty={true}
              native={false}
              variant='outlined'
            >
              <MenuItem value="ID">ID</MenuItem>
              <MenuItem value="Modelo">Modelo</MenuItem>
              <MenuItem value="Cliente">Cliente</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            equipmentsListToDisplay={
              ordenar(equipmentsListToDisplay, ordem.by, ordem.alfabetica,
                ordem.by === "last_collect_date" ? true : false)
                .map((equipment) => {
                  return {
                    id_equipment: equipment.id_equipment,
                    model_equipment: equipment.model_equipment,
                    client: equipment.client,
                    last_collect_date: equipment.last_collect_date,
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
