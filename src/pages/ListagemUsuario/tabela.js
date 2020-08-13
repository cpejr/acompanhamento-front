import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  tabelaCelula: {
    minWidth: "170px",
    position: "relative",
    backgroundColor: "#2196F3"
  }
});

export default function StickyHeadTable(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [users, setUsers] = useState(ordenamentoInicial);
  const [ordemAlfabetica, setOrdemAlfabetica] = useState(true);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function handleOrdenar() {
    const usersOrdem = users;

    usersOrdem.sort((a, b) => (
      ordemAlfabetica ? -sortOrdem(a, b) : sortOrdem(a, b)
    ));

    setUsers(usersOrdem);
    setOrdemAlfabetica(!ordemAlfabetica);
  }

  function ordenamentoInicial() {
    const usersOrdem = props.usersListToDisplay;

    usersOrdem.sort((a, b) => sortOrdem(a, b));

    return usersOrdem;
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

  console.log(props.usersListToDisplay)

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tabelaCelula}>
                <TableSortLabel
                  active
                  direction={ordemAlfabetica ? "desc" : "asc"}
                  onClick={handleOrdenar}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tabelaCelula}>Função</TableCell>
              <TableCell className={classes.tabelaCelula}>Última data ativa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(user => (
                <TableRow hover tabIndex={-1} key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.funcao}</TableCell>
                  <TableCell>{user.data}</TableCell>
                </TableRow>
              )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.usersListToDisplay.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
