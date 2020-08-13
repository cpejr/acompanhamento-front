import React from 'react';
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

  function handleChangePage(event, newPage) {
    setPage(newPage);
  };

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tabelaCelula}>
                <TableSortLabel
                  active
                  direction={props.ordemAlfabetica ? "desc" : "asc"}
                  onClick={() => props.setOrdemAlfabetica(!props.ordemAlfabetica)}
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tabelaCelula}>Função</TableCell>
              <TableCell className={classes.tabelaCelula}>Última data ativa</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.usersListToDisplay
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
