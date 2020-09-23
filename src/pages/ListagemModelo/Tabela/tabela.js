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
                  active={ordem.by === "id_model" ? true : false}
                  direction={ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "id_model" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "id_model" })
                  }}
                >
                  Modelo
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={props.ordem.by === "type_model" ? true : false}
                  direction={props.ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "type_model" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "type_model" })
                  }}
                >
                  Tipo
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableCell}>
                <TableSortLabel
                  active={props.ordem.by === "producer_model" ? true : false}
                  direction={props.ordem.alfabetica ? "desc" : "asc"}
                  onClick={() => {
                    ordem.by === "producer_model" ?
                      setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                      setOrdem({ ...ordem, by: "producer_model" })
                  }}
                >
                  Fabricante
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {props.modelsListToDisplay
              .map(model => (
                <TableRow hover tabIndex={-1} key={model.id_model}>
                  <TableCell>{model.id_model}</TableCell>
                  <TableCell>{model.type_model}</TableCell>
                  <TableCell className={classes.lastTableCell}>{model.producer_model}
                    <Link to='/'>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </Link>
                  </TableCell>
                </TableRow>
              )
              )}
            {props.modelsListToDisplay.length <= 0 ? <Typography className={classes.nullModel}> Este modelo não foi encontrado </Typography> : null}
          </TableBody> */}
        </Table>
      </TableContainer>
    </Paper >
  );
}
