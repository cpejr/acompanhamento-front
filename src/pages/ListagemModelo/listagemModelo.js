import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom"

import {
  Button,
  InputBase,
  Typography
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import ordenar from '../../services/ordenar';
import { DataContext } from '../../context/DataContext';
import { useStyles } from './listagemModeloStyle';
import StickyHeadTable from './Tabela';

export default function ListagemModelo() {
  const classes = useStyles();

  const query = new URLSearchParams(useLocation().search);
  const situation = query.get('situation');

  const allEquipment = useContext(DataContext).equipmentsList;
  const equipmentsOriginal = situation ?
    allEquipment.filter(equipment => equipment.situation === situation) :
    allEquipment;

  const [ordem, setOrdem] = useState({ alfabetica: false, by: "last_collect_date" });
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState(equipmentsOriginal);

  function FindEquipmentbyID(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

      equipmentsOriginal.forEach((item) => {
        const probable = item.id_equipment.toLowerCase().match(filteredEquipment);
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
            Modelos
          </Typography>
          <Button component={Link} to="/cadastromodelo" className={classes.buttonAdd}>
            Adicionar Novo
          </Button>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.searchInput}>
            <InputBase className={classes.placeholder}
              placeholder="Procurar equipamento"
              onChange={(e) => FindEquipmentbyID(e.target.value)}
              classes={{
                root: classes.inputRoot,
                input: classes.input,
              }}
            />
          </div>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            equipmentsListToDisplay={
              ordenar(equipmentsListToDisplay, ordem.by, ordem.alfabetica,
                ordem.by === "last_collect_date" ? true : false)
                .map((equipment) => {
                  return {
                    id_equipment: equipment.id_equipment,
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
