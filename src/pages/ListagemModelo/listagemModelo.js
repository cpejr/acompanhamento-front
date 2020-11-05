import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import {
  Button,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  Select,
  CircularProgress,
  Backdrop
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';

import ordenar from '../../services/ordenar';
import api from '../../services/api';
import { useStyles } from './listagemModeloStyle';
import StickyHeadTable from './Tabela';

export default function ListagemModelo() {
  const [filterby, setFilterby] = useState("modelName");
  const [ordem, setOrdem] = useState({ alfabetica: true, by: "modelName" });
  const [modelsOriginal, setModelsOriginal] = useState()
  const [loading, setLoading] = useState(true);
  const [modelsListToDisplay, setModelsListToDisplay] = useState();

  useEffect(() => {
    api.get('model/index')
      .then(model => {
        const models = model.data.data
        setModelsOriginal(models);
        setModelsListToDisplay(models);
        setLoading(false)
      })
      .catch(err => {
        console.error("Não foi possivel estabelecer conecção com o backend", err);
      });
  }, [])

  function FindModel(searchModel) {
    if (searchModel.length > 0) {
      const modelsListToDisplay = [];
      const filteredModel = new RegExp(searchModel.toLowerCase(), 'g');

      modelsOriginal.forEach(item => {
        var probable = item[filterby].toLowerCase().match(filteredModel);
        if (probable) {
          modelsListToDisplay.push(item);
        }
      });
      setModelsListToDisplay(modelsListToDisplay);
    } else {
      setModelsListToDisplay(modelsOriginal);
    }
  }

  const classes = useStyles();

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
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
              // displayEmpty={true}
              // native={false}
              variant='outlined'
            >
              <MenuItem value="modelName">Modelo</MenuItem>
              <MenuItem value="type">Tipo</MenuItem>
              <MenuItem value="manufacturer">Fabricante</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className={classes.table}>
          <StickyHeadTable
            modelsListToDisplay={
              ordenar(modelsListToDisplay, ordem.by, ordem.alfabetica)
                .map(model => {
                  return {
                    id: model.id,
                    modelName: model.modelName,
                    type: model.type,
                    manufacturer: model.manufacturer,
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
