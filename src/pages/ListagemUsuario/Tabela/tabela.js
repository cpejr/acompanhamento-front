import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./tabelaStyle";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@material-ui/core";
import "./tabela.css"

export default function StickyHeadTable({
  ordemAlfabetica,
  usersListToDisplay,
  setOrdemAlfabetica
}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" id="table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active
                  direction={ordemAlfabetica ? "desc" : "asc"}
                  onClick={() =>
                    setOrdemAlfabetica(!ordemAlfabetica)
                  }
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>Função</TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active
                  direction={ordemAlfabetica ? "desc" : "asc"}
                  onClick={() =>
                    setOrdemAlfabetica(!ordemAlfabetica)
                  }
                >
                  Útima data ativa
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell} style={{ textAlign: "center" }} >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {usersListToDisplay.map((user) => (
              <TableRow hover key={user.id}>
                <TableCell>
                  {user.name}{" "}
                </TableCell>
                <TableCell>
                  {user.funcao}{" "}
                </TableCell>
                <TableCell>
                  { user.data }
                </TableCell>

                <TableCell className={classes.lastTableCell} >
                  <Button
                    component={Link}
                    to={`/listagemequipamento?userid=${user.id}`}
                    variant="outlined"
                    disableElevation
                    className={classes.buttonAdd}
                  >
                    Equipamentos
                  </Button>

                  <Button
                    component={Link}
                    to={`/au/${user.id}`}
                    variant="outlined"
                    disableElevation
                    className={classes.buttonUser}
                  >
                    Dados
                  </Button>

                </TableCell>

              </TableRow>
            ))}

            {usersListToDisplay.length <= 0 ? (
              <Typography className={classes.nullUser}>
                Este usuário não foi encontrado{" "}
              </Typography>
            ) : null}

          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
