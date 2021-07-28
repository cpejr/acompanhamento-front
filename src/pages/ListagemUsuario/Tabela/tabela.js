import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./tabelaStyle";
import {
  Paper,
  Table, 
  Button,
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
              <TableCell className={classes.tableCell}>
                O que serei
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
                    {user.data}{" "}
                </TableCell>
                <TableCell>
                <Button component={Link}
                to={`/au/${user.id}`}
                className={classes.ButtonData}> O que serei? </Button>
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
