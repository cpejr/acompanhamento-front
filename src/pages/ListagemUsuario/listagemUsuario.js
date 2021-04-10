import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  InputBase,
  CssBaseline,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

import { useStyles } from "./listagemUsuarioStyle";
import StickyHeadTable from "./Tabela";
import SearchIcon from "@material-ui/icons/Search";
import ordenar from "../../services/ordenar";
import { DataContext } from "../../context/DataContext";
import api from "../../services/api";
export default function ListagemUsuario() {
  const classes = useStyles();

  const { usersList } = useContext(DataContext);

  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [usersListToDisplay, setUsersListToDisplay] = useState([]);
  const [filterThisUsers, setFilterThisUsers] = useState({
    administrador: true,
    funcionario: true,
    cliente: true,
  });

  async function getEmployees() {
    try {
      const response = await api.get("/users");
      console.log("Response: ", response);
      setEmployees([...response.data.user]);
      setUsersListToDisplay([...response.data.user]);
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar funcionários");
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  function FindPeoplebyName(searchPerson) {
    //Seta para vazio
    setUsersListToDisplay([]);

    const filteredPeople = new RegExp(searchPerson.toLowerCase(), "g");
    employees.forEach((employee) => {
      if (employee.name.toLowerCase().match(filteredPeople)) {
        //Adiciona funcionario filtrado ao array
        setUsersListToDisplay((usersListToDisplay) => [
          ...usersListToDisplay,
          employee,
        ]);
        // funcionario.push(employee);
        // setEmployees(funcionario);
      }
    });

    // Se nao tiver nada no Input de busca, cooca todos
    if (filteredPeople === "") {
      setUsersListToDisplay([...employees]);
    }
  }

  // function FindPeoplebyName(searchPerson) {
  //   if (searchPerson.length > 0) {
  //     const filteredPeople = new RegExp(searchPerson.toLowerCase(), "g");

  //     employees.filter((item) => {
  //       const probable = item.name.toLowerCase().match(filteredPeople);
  //       if (probable) {
  //         usersListToDisplay.push(item);
  //         console.log("UserList: ", usersListToDisplay);
  //       }
  //     });
  //     setUsersListToDisplay(usersListToDisplay);
  //   } else {
  //     setUsersListToDisplay(employees);
  //   }
  // }

  // function FindPeoplebyEmail(searchPerson) {
  //   if (searchPerson.length > 0) {
  //     const usersListToDisplay = [];
  //     const filteredPeople = new RegExp(searchPerson.toLowerCase(), 'g');

  //     usersList.forEach((item) => {
  //       const probable = item.email.toLowerCase().match(filteredPeople);
  //       if (probable) {
  //         usersListToDisplay.push(item);
  //       }
  //     });
  //     setUsersListToDisplay(usersListToDisplay);
  //   } else {
  //     setUsersListToDisplay(usersList);
  //   }
  // }

  const filterByUsers = (employees) => {
    let users = employees;

    console.log("Employee: ", users);

    //Remove ou não administrador
    if (!filterThisUsers.administrador) {
      employees.forEach((employee) => {
        if (employee.name.toLowerCase().match("Administrador")) {
          //Adiciona funcionario filtrado ao array
          setUsersListToDisplay((usersListToDisplay) => [
            ...usersListToDisplay,
            employee,
          ]);
        }
      });
    }

    //Remove ou não funcionário
    if (!filterThisUsers.funcionario) {
      employees.forEach((employee) => {
        if (employee.type.toLowerCase().match("Funcionario")) {
          //Adiciona funcionario filtrado ao array
          setUsersListToDisplay((usersListToDisplay) => [
            ...usersListToDisplay,
            employee,
          ]);
        }
      });
    }

    //Remove ou não cliente
    if (!filterThisUsers.cliente) {
      users = users.filter((user) => user.type !== "PF" || user.type !== "PJ");
    }

    employees.forEach((employee) => {
      if (employee.name.toLowerCase().match("Administrador")) {
        //Adiciona funcionario filtrado ao array
        setUsersListToDisplay((usersListToDisplay) => [
          ...usersListToDisplay,
          employee,
        ]);
      }
    });
    //   if (employee.name.toLowerCase().match("Funcionario")) {
    //     //Adiciona funcionario filtrado ao array
    //     setUsersListToDisplay((usersListToDisplay) => [
    //       ...usersListToDisplay,
    //       employee,
    //     ]);
    //   }
    //     if (employee.name.toLowerCase().match("PF" || "PJ")) {
    //       //Adiciona funcionario filtrado ao array
    //       setUsersListToDisplay((usersListToDisplay) => [
    //         ...usersListToDisplay,
    //         employee,
    //       ]);
    //   // funcionario.push(employee);
    //   // setEmployees(funcionario);
    // }

    return users;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
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

        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <div className={classes.searchInput}>
            <InputBase
              className={classes.placeholder}
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
                    administrador: !filterThisUsers.administrador,
                  })
                }
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
                    funcionario: !filterThisUsers.funcionario,
                  })
                }
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
                    cliente: !filterThisUsers.cliente,
                  })
                }
                color="default"
              />
            }
            label="Cliente"
          />
        </div>

        <div className={classes.table}>
          <StickyHeadTable
            usersListToDisplay={ordenar(
              filterByUsers(usersListToDisplay),
              "name",
              ordemAlfabetica
            ).map((employees) => {
              return {
                id: employees.id,
                name: employees.name,
                funcao: employees.type,
                data: employees.updateAt,
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
