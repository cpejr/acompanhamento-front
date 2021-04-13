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

  const headerItems = [
    { title: "Modelo", ordemBy: "modelName" },
    { title: "Tipo", ordemBy: "type" },
    { title: "Fabricante", ordemBy: "manufacturer" }
  ]

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {headerItems.map(item => (
                <TableCell className={classes.tableCell} key={item.title}>
                  <TableSortLabel
                    active={ordem.by === item.ordemBy ? true : false}
                    direction={ordem.alfabetica ? "desc" : "asc"}
                    onClick={() => {
                      ordem.by === item.ordemBy ?
                        setOrdem({ ...ordem, alfabetica: !ordem.alfabetica }) :
                        setOrdem({ ...ordem, by: item.ordemBy })
                    }}
                  >
                    {item.title}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.modelsListToDisplay
              .map(model => (
                <TableRow hover tabIndex={-1} key={model.id}>
                  <TableCell>{model.modelName}</TableCell>
                  <TableCell>{model.type}</TableCell>
                  <TableCell className={classes.lastTableCell}>{model.manufacturer}
                    <Link to={`/am/${model.id}`}>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </Link>
                  </TableCell>
                </TableRow>
              )
              )}
            {props.modelsListToDisplay.length <= 0 ? <Typography className={classes.nullModel}> Este modelo não foi encontrado </Typography> : null}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper >
  );
}
