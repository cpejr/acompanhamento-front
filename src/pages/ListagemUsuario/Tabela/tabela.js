import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./tabelaStyle";
import {
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
import LinkMenu from "../../../components/LinkMenu";

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState("");
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
              <TableCell className={classes.tableCell}>Informações</TableCell>
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
                    to={`/au/${user.id}`}
                  >
                    {user.funcao}{" "}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`/au/${user.id}`}
                  >
                    {user.data}
                  </Link>
                </TableCell>
                <TableCell className={classes.lastTableCell}>
                  <LinkMenu
                    id={user.id}
                    type={user.type}
                    client={user.cpf || user.cnpj}
                    openMenu={openMenu}
                    userName={user.name}
                    setOpenMenu={setOpenMenu}
                  >
                    <FiMoreHorizontal size={25} color="#C4C4C4" />
                  </LinkMenu>
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
