import React, { useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom"

import {
  Button,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  Select
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import ordenar from '../../services/ordenar';
import { DataContext } from '../../context/DataContext';
import { useStyles } from './listagemModeloStyle';
import StickyHeadTable from './Tabela';

export default function ListagemModelo() {
  const classes = useStyles();
  const [filterby, setFilterby] = useState("");

  const query = new URLSearchParams(useLocation().search);
  const situation = query.get('situation');

  const allModel = useContext(DataContext).modelsList;
  const modelsOriginal = situation ?
    allModel.filter(model => model.situation === situation) :
    allModel;

  const [ordem, setOrdem] = useState({ alfabetica: false, by: "last_collect_date" });
  const [modelsListToDisplay, setModelsListToDisplay] = useState(modelsOriginal);

  function FindModel(searchModel) {
    if (searchModel.length > 0) {
      const modelsListToDisplay = [];
      const filteredModel = new RegExp(searchModel.toLowerCase(), 'g');

      modelsOriginal.forEach((item) => {
        var probable;
        switch (filterby) {
          case "Modelo":
            probable = item.id_model.toLowerCase().match(filteredModel);
            break;
          case "Tipo":
            probable = item.type_model.toLowerCase().match(filteredModel);
            break;
          case "Fabricante":
            probable = item.producer_model.toLowerCase().match(filteredModel);
            break;
        }
        if (probable) {
          modelsListToDisplay.push(item);
        }
      });
      setModelsListToDisplay(modelsListToDisplay);
    } else {
      setModelsListToDisplay(modelsOriginal);
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
        <div className={classes.searchplusfilter}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.searchInput}>
              <InputBase className={classes.placeholder}
                placeholder="Procurar modelo"
                onChange={(e) => FindModel(e.target.value)}
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
              displayEmpty={true}
              native={false}
              variant='outlined'
            >
              <MenuItem value="Modelo">Modelo</MenuItem>
              <MenuItem value="Tipo">Tipo</MenuItem>
              <MenuItem value="Fabricante">Fabricante</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            modelsListToDisplay={
              ordenar(modelsListToDisplay, ordem.by, ordem.alfabetica,
                ordem.by === "id_model" ? true : false)
                .map((model) => {
                  return {
                    id_model: model.id_model,
                    type: model.type,
                    producer: model.producer,
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
