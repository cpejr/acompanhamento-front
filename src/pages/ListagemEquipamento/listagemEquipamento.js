import React, { useState } from 'react';
import './listagemEquipamentoStyle';

import { Link } from "react-router-dom"
import StickyHeadTable from './Tabela';

import {
  Button,
  InputBase,
  Typography
} from "@material-ui/core";

import ListEquipments from '../../services/data'
import { useStyles } from './listagemEquipamentoStyle';
import SearchIcon from '@material-ui/icons/Search';

export default function ListagemEquipamento(props) {
  const classes = useStyles();

  const equipmentsOriginal = ListEquipments;

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState(equipmentsOriginal);

  function FindEquipmentbyID(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

      equipmentsOriginal.forEach((item) => {
        const probable = item.id_equipent.toLowerCase().match(filteredEquipment);
        if (probable) {
          equipmentsListToDisplay.push(item);
        }

      });
      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
  }

  function FindEquipmentbyClient(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

      equipmentsOriginal.forEach((item) => {
        const probable = item.client.toLowerCase().match(filteredEquipment);
        if (probable) {
          equipmentsListToDisplay.push(item);
        }
      });
      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
  }

  function FindEquipmentbyLastVisit(searchEquipment) {
    if (searchEquipment.length > 0) {
      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), 'g');

      equipmentsOriginal.forEach((item) => {
        const probable = item.last_collect_date.toLowerCase().match(filteredEquipment);
        if (probable) {
          equipmentsListToDisplay.push(item);
        }
      });
      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
  }

  function ordenar(equipments) {
    equipments.sort((a, b) => (
      ordemAlfabetica ? sortOrdem(a, b) : -sortOrdem(a, b)
    ));
    return equipments;
  }

  function sortOrdem(a, b) {
    if (a.id_equipent > b.id_equipent) {
      return 1;
    }
    if (a.id_equipent < b.id_equipent) {
      return -1;
    }
    return 0;
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
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.searchInput}>
            <InputBase className={classes.placeholder}
              placeholder="Procurar equipamento"
              onChange={(e) => {
                FindEquipmentbyID(e.target.value)
                FindEquipmentbyLastVisit(e.target.value)
                FindEquipmentbyClient(e.target.value)
              }}
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
              ordenar(equipmentsListToDisplay).map((equipment) => {
                return {
                  id_equipment: equipment.id_equipment,
                  client: equipment.client,
                  last_collect_date: equipment.last_collect_date,
                }
              })
            }
            setOrdemAlfabetica={setOrdemAlfabetica}
            ordemAlfabetica={ordemAlfabetica} />
        </div>
      </div>
    </React.Fragment>
  )
}
