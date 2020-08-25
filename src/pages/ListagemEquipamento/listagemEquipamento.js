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

  const [ordem, setOrdem] = useState({ alfabetica: false, by: "ultimaVisita" });
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

  // function FindPeoplebyName(searchPerson) {
  //   if (searchPerson.length > 0) {
  //     const usersListToDisplay = [];
  //     const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

  //     usersOriginal.forEach((item) => {
  //       const probable = item.name.toLowerCase().match(filteredPeople);
  //       if (probable) {
  //         usersListToDisplay.push(item);
  //       }

  //     });
  //     setUsersListToDisplay(usersListToDisplay);
  //   } else {
  //     setUsersListToDisplay(usersOriginal);
  //   }
  // }
  function sortOrdem(a, b) {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }//função que ordena itens de um array

  function ordenar(equipments) {
    equipments.sort((a, b) => {
      switch (ordem.by) {
        case "serie":
          a = a.id_equipment
          b = b.id_equipment
          break;
        case "cliente":
          a = a.client
          b = b.client
          break;
        case "ultimaVisita":
          a = a.last_collect_date.split("/").reverse().join("");
          b = b.last_collect_date.split("/").reverse().join("");
          break;

        default:
          break;
      }
      return (
        ordem.alfabetica ? sortOrdem(a, b) : -sortOrdem(a, b)
      )
    });
    return equipments;
  }// logica da ordenação (alfabetica ou inversa)

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
              ordenar(equipmentsListToDisplay).map((equipment) => {
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
