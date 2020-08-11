import React from 'react';
import './listagemusUsuarioStyle';

import { Link } from "react-router-dom"
import StickyHeadTable from './tabela';

import { Button } from 'react-bootstrap';
import {
  Typography,
  InputBase,
  CssBaseline,
} from "@material-ui/core";
import { useStyles } from './listagemusUsuarioStyle';

import SearchIcon from '@material-ui/icons/Search';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.cabecario}>
          <Typography variant="h3" className={classes.tittle}>
            Usuários
        </Typography>
          <Link to="/cadastrousuario">
            <Button className={classes.botaoadd}
            >Adicionar Novo</Button>
          </Link>
        </div>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Procurar usuário por nome ou email"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <div className={classes.tabela}>
          <StickyHeadTable></StickyHeadTable>
        </div>

      </div>
    </React.Fragment>
  )
}