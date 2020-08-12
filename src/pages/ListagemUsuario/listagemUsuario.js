import React, { useState } from 'react';
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
import CreatePeople from "../../services/people"
import SearchIcon from '@material-ui/icons/Search';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  const [listUsers,setListUsers] = useState(CreatePeople.people);

  function FindPeople(pessoa) {
    const people = CreatePeople.people;
    if (pessoa.length > 0) {
      var pessoas = [];
      const filteredPeople = new RegExp(pessoa.toLowerCase(), 'g');

      people.map((item) => {
        const probable = item.name.toLowerCase().match(filteredPeople);
        if (probable) {
          pessoas.push(item);
        }
      });
      setListUsers(pessoas);
    }
  }

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
            onChange={(e) => FindPeople(e.target.value)}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <div className={classes.tabela}>
          <StickyHeadTable people={listUsers}></StickyHeadTable>
        </div>

      </div>
    </React.Fragment>
  )
}