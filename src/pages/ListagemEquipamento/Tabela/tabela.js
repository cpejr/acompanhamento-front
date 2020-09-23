import React from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './tabelaStyle';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import { FiMoreHorizontal } from "react-icons/fi"

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const { ordem, setOrdem } = props;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={ordem.by === "id_equipment" ? true : false}
                  direction={ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "id_equipment" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "id_equipment" })
                  }}
                >
                  Nº série
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={props.ordem.by === "model_equipment" ? true : false}
                  direction={props.ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "model_equipment" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "model_equipment" })
                  }}
                >
                  Modelo
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={props.ordem.by === "client" ? true : false}
                  direction={props.ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "client" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "client" })
                  }}
                >
                  Cliente
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={props.ordem.by === "last_collect_date" ? true : false}
                  direction={props.ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "last_collect_date" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "last_collect_date" })
                  }}
                >
                  Última visita
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.equipmentsListToDisplay
              .map(equipment => (
                <TableRow hover tabIndex={-1} key={equipment.id_equipment}>
                  <TableCell>{equipment.id_equipment}</TableCell>
                  <TableCell>{equipment.model_equipment}</TableCell>
                  <TableCell>{equipment.client}</TableCell>
                  <TableCell className={classes.lastTableCell}>{equipment.last_collect_date}
                    <Link to='/'>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </Link>
                  </TableCell>
                </TableRow>
              )
              )}
            {props.equipmentsListToDisplay.length <= 0 ? <Typography className={classes.nullEquipament}> Este equipamento não foi encontrado </Typography> : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
