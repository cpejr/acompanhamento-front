import React, {useEffect} from "react";
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

export default function StickyHeadTable({
  ordemAlfabetica,
  usersListToDisplay,
  setOrdemAlfabetica
}) {
  const classes = useStyles();

  useEffect(()=>{
    console.log(usersListToDisplay);
  },[usersListToDisplay])

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
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
                Última data ativa
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
