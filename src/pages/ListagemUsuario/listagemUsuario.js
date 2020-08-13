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
import SearchIcon from '@material-ui/icons/Search';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);

  const usersOrdenado = ordenar(props.usersList)

  const [usersListToDisplay, setUsersListToDisplay] = useState(usersOrdenado);

  function FindPeoplebyName(searchPerson) {
    if (searchPerson.length > 0) {
      const usersListToDisplay = [];
      const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

      usersOrdenado.forEach((item) => {
        const probable = item.name.toLowerCase().match(filteredPeople);
        if (probable) {
          usersListToDisplay.push(item);
        }
      });
      setUsersListToDisplay(usersListToDisplay);
    } else {
      setUsersListToDisplay(usersOrdenado);
    }
  }

  function FindPeoplebyEmail(searchPerson) {
    if (searchPerson.length > 0) {
      const usersListToDisplay = [];
      const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

      usersOrdenado.forEach((item) => {
        const probable = item.email.toLowerCase().match(filteredPeople);
        if (probable) {
          usersListToDisplay.push(item);
        }
      });
      setUsersListToDisplay(usersListToDisplay);
    } else {
      setUsersListToDisplay(usersOrdenado);
    }
  }

  function ordenar(users) {
    users.sort((a, b) => (
      ordemAlfabetica ? sortOrdem(a, b) : -sortOrdem(a, b)
    ));
    return users;
  }

  function sortOrdem(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
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
            onChange={(e) => {
              var arroba = "@"
              if ((e.target.value).indexOf(arroba) > -1)
                FindPeoplebyEmail(e.target.value)
              else FindPeoplebyName(e.target.value)
            }}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>

        <div className={classes.tabela}>
          <StickyHeadTable
            usersListToDisplay={
              ordenar(usersListToDisplay).map((user) => {
                return {
                  name: user.name,
                  funcao: user.funcao,
                  data: user.lastactive,
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
