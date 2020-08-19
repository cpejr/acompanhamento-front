import React, { useState } from 'react';
import './listagemusUsuarioStyle';

import { Link } from "react-router-dom"
import StickyHeadTable from './Tabela';

import {
  Typography,
  InputBase,
  CssBaseline,
  Button
} from "@material-ui/core";
import { useStyles } from './listagemusUsuarioStyle';
import SearchIcon from '@material-ui/icons/Search';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  const usersOriginal = props.usersList;

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [usersListToDisplay, setUsersListToDisplay] = useState(usersOriginal);

  function FindPeoplebyName(searchPerson) {
    if (searchPerson.length > 0) {
      const usersListToDisplay = [];
      const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

      usersOriginal.forEach((item) => {
        const probable = item.name.toLowerCase().match(filteredPeople);
        if (probable) {
          usersListToDisplay.push(item);
        }

      });
      setUsersListToDisplay(usersListToDisplay);
    } else {
      setUsersListToDisplay(usersOriginal);
    }
  }

  function FindPeoplebyEmail(searchPerson) {
    if (searchPerson.length > 0) {
      const usersListToDisplay = [];
      const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

      usersOriginal.forEach((item) => {
        const probable = item.email.toLowerCase().match(filteredPeople);
        if (probable) {
          usersListToDisplay.push(item);
        }
      });
      setUsersListToDisplay(usersListToDisplay);
    } else {
      setUsersListToDisplay(usersOriginal);
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
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Usuários
          </Typography>
          <Button component={Link} to="/cadastrousuario" className={classes.buttonAdd}>
            Adicionar Novo
          </Button>
        </div>

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.searchInput}>
            <InputBase className={classes.placeholder}
              placeholder="Procurar usuário por nome ou email"
              onChange={(e) => {
                var arroba = "@";
                if ((e.target.value).indexOf(arroba) > -1) FindPeoplebyEmail(e.target.value);
                else FindPeoplebyName(e.target.value);
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
