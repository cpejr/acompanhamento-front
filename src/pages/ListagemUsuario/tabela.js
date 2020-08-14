import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel
} from '@material-ui/core';
import { FiMoreHorizontal } from "react-icons/fi"

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    // overflow: 'hidden',
    maxHeight: 550,
  },
  tabelaCelula: {
    minWidth: "170px",
    position: "relative",
    backgroundColor: "#2196F3",
    fontWeight: "500",
    fontSize: "16px"
  },
  lastTableCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
});

export default function StickyHeadTable(props) {
  const classes = useStyles();

  // const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // function handleChangePage(event, newPage) {
  //   setPage(newPage);
  // };

  // function handleChangeRowsPerPage(event) {
  //   setRowsPerPage(+event.target.value);
  //   setPage(0);
  // };

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
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(user => (
                <TableRow hover tabIndex={-1} key={user.name}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.funcao}</TableCell>
                  <TableCell className={classes.lastTableCell}>{user.data}
                    <Link to='/'>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </Link>
                  </TableCell>
                </TableRow>
              )
              )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.usersListToDisplay.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
