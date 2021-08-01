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
import { FiMoreHorizontal } from "react-icons/fi";

export default function StickyHeadTable(props) {
  const classes = useStyles();
  console.log(props.usersListToDisplay);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active
                  direction={props.ordemAlfabetica ? "desc" : "asc"}
                  onClick={() =>
                    props.setOrdemAlfabetica(!props.ordemAlfabetica)
                  }
                >
                  Nome
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>Função</TableCell>
              <TableCell className={classes.tableCell}>
                Última data ativa
              </TableCell>
              <TableCell className={classes.tableCell} style={{ textAlign: "center" }} >
                Acesso ao Equipamento
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.usersListToDisplay.map((user) => (
              <TableRow hover tabIndex={-1} key={user.name}>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/au/${user.id}`}
                  >
                    {user.name}{" "}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {user.funcao}{" "}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {user.data}
                  </Link>
                </TableCell>

                <TableCell className={classes.lastTableCell} >
                  <Button
                    component={Link}
                    to={`/listagemequipamento?userid=${user.id}`}
                    variant="outlined"
                    disableElevation
                    className={classes.buttonAdd}
                  >
                    Acessar
                  </Button>
                </TableCell>

              </TableRow>
            ))}
            {props.usersListToDisplay.length <= 0 ? (
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
