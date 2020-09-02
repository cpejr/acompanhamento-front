import React, { useState } from 'react';
import './listagemUsuarioStyle';

import { Link } from "react-router-dom"
import StickyHeadTable from './Tabela';

import {
  Typography,
  InputBase,
  CssBaseline,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { useStyles } from './listagemUsuarioStyle';
import SearchIcon from '@material-ui/icons/Search';

export default function ListagemUsuario(props) {
  const classes = useStyles();

  const usersOriginal = props.usersList;

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [usersListToDisplay, setUsersListToDisplay] = useState(usersOriginal);
  const [filterThisUsers, setFilterThisUsers] = useState({
    administrador: true,
    funcionario: true,
    cliente: true,
  })

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

  // function FindPeoplebyEmail(searchPerson) {
  //   if (searchPerson.length > 0) {
  //     const usersListToDisplay = [];
  //     const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

  //     usersOriginal.forEach((item) => {
  //       const probable = item.email.toLowerCase().match(filteredPeople);
  //       if (probable) {
  //         usersListToDisplay.push(item);
  //       }
  //     });
  //     setUsersListToDisplay(usersListToDisplay);
  //   } else {
  //     setUsersListToDisplay(usersOriginal);
  //   }
  // }

  const filterByUsers = (props) => {
    let users = props;

    //Remove ou não administrador
    if (!filterThisUsers.administrador) {
      users = users.filter(user => user.funcao !== "Administrador")
    }

    //Remove ou não funcionário
    if (!filterThisUsers.funcionario) {
      users = users.filter(user => user.funcao !== "Funcionário")
    }

    //Remove ou não cliente
    if (!filterThisUsers.cliente) {
      users = users.filter(user => user.funcao !== "Cliente")
    }

    return users;
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
                FindPeoplebyName(e.target.value);
                // var arroba = "@";
                // if ((e.target.value).indexOf(arroba) > -1) FindPeoplebyEmail(e.target.value);
                // else FindPeoplebyName(e.target.value);
              }}
              classes={{
                root: classes.inputRoot,
                input: classes.input,
              }}
            />
          </div>
        </div>
        <div className={classes.searchFilter}>
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkbox}
                checked={filterThisUsers.administrador}
                onChange={() =>
                  setFilterThisUsers({
                    ...filterThisUsers,
                    administrador: !filterThisUsers.administrador
                  })}
                color="default"
              />
            }
            label="Administrador"
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkbox}
                checked={filterThisUsers.funcionario}
                onChange={() =>
                  setFilterThisUsers({
                    ...filterThisUsers,
                    funcionario: !filterThisUsers.funcionario
                  })}
                color="default"
              />
            }
            label="Funcionário"
          />
          <FormControlLabel
            control={
              <Checkbox
                className={classes.checkbox}
                checked={filterThisUsers.cliente}
                onChange={() =>
                  setFilterThisUsers({
                    ...filterThisUsers,
                    cliente: !filterThisUsers.cliente
                  })}
                color="default"
              />
            }
            label="Cliente"
          />
        </div>

        <div className={classes.table}>
          <StickyHeadTable
            usersListToDisplay={
              ordenar(filterByUsers(usersListToDisplay)).map((user) => {
                return {
                  id: user.id,
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
