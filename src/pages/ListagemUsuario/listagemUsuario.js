import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  InputBase,
  CssBaseline,
  Button,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";

import { useStyles } from "./listagemUsuarioStyle";
import StickyHeadTable from "./Tabela";
import SearchIcon from "@material-ui/icons/Search";
import ordenar from "../../services/ordenar";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { LoginContext } from '../../context/LoginContext';

export default function ListagemUsuario() {
  const classes = useStyles();

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [filterByOptions, setFilterByOptions] = useState("nameEmail");
  const [messagePlaceholder, setMessagePlaceholder] = useState("Procurar usuário por nome ou e-mail");
  const [usersListToDisplay, setUsersListToDisplay] = useState([]);

  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();
  const { sendMessage } = useContext(AuthContext);

  async function getEmployees() {
    api
      .get("/user", {headers: {authorization: `Bearer ${accessToken}`}})
      .then((response) => {
        setEmployees([...response.data.user]);
        setUsersListToDisplay([...response.data.user]);
      })
      .catch((error) => {
        console.warn(error);
        sendMessage("Erro ao buscar usuários.", "error", null);
      });
  }

  useEffect(() => {
    getEmployees();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Mensagem do placeholder de acordo com a caixa de seleção
  function messageDisplay(e) {
    setFilterByOptions(e.target.value);
    if (e.target.value === "nameEmail") {
      setMessagePlaceholder("Procurar usuário por nome ou e-mail");
    } else if (e.target.value === "funcao") {
      setMessagePlaceholder("Procurar usuário por função");
    }
  }

  function handleSearchChange(search) {
    const searchByName = findPeoplebyName(search);
    const searchByEmail = findPeoplebyEmail(search);
    const searchByFuncao = findPeoplebyFuncao(search);
    let finalResult;

    if (filterByOptions === "nameEmail") {
      finalResult = getUnique([...searchByName, ...searchByEmail])
    }
    if (filterByOptions === "funcao") {
      finalResult = getUnique([...searchByFuncao])
    }

    setUsersListToDisplay(finalResult);
  }

  function findPeoplebyName(name) {
    const filteredUsers =
      employees.filter((employee) => {

        if (employee.name) {
          return employee.name.toString().toLowerCase().includes(name.toString().toLowerCase())
        } else return false;
      })
    return filteredUsers;
  }

  function findPeoplebyEmail(email) {
    const filteredUsers =
      employees.filter((employee) => {
        if (employee.email) {
          return employee.email.toString().toLowerCase().includes(email.toString().toLowerCase())
        } else return false;
      })
    return filteredUsers;
  }

  function findPeoplebyFuncao(funcao) {
    const filterFuncao =
      employees.filter((employee) => {
        if (employee.type) {
          return employee.type.toString().toLowerCase().includes(funcao.toString().toLowerCase())
        } else return false;
      })
    return filterFuncao;
  }


  function getUnique(arr) {
    let final = [];
    arr.forEach((elem) => {
      if (final.includes(elem)) return;
      final.push(elem);
    })
    return final;
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.allsearch}>
          <div className={classes.header}>
            <Typography variant="h3" className={classes.title}>
              Usuários
            </Typography>
            <Button
              component={Link}
              to="/cadastrousuario"
              className={classes.buttonAdd}
            >
              Adicionar Novo
            </Button>
          </div>
        </div>

        <div className={classes.searchplusfilter}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.searchInput}>
              <InputBase
                className={classes.placeholder}
                placeholder={messagePlaceholder}
                onChange={(e) => {
                  handleSearchChange(e.target.value);
                }}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
              />
            </div>
          </div>
          <FormControl className={classes.filter}>
            <Select
              className={classes.selectItens}
              value={filterByOptions}
              onChange={(e) => messageDisplay(e)}
              variant="outlined"
            >
              <MenuItem value="nameEmail">Nome</MenuItem>
              <MenuItem value="funcao">Tipo de Usuário</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.table}>
          <StickyHeadTable
            usersListToDisplay={ordenar(
              usersListToDisplay,
              "name",
              ordemAlfabetica
            ).map((employees) => {
              return {
                id: employees.id,
                name: employees.name,
                funcao: employees.type,
                data: employees.active,
                id_equipments: employees.id_equipments,
              };
            })}
            setOrdemAlfabetica={setOrdemAlfabetica}
            ordemAlfabetica={ordemAlfabetica}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
