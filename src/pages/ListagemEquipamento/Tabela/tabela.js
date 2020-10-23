import React from 'react';
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

import LinkMenu from '../../../components/LinkMenu'

export default function StickyHeadTable(props) {
  const classes = useStyles();
  const { ordem, setOrdem } = props;
  const [openMenu, setOpenMenu] = React.useState("");

  const headerItems = [
    { title: "Nº série", ordemBy: "id_equipment" },
    { title: "Modelo", ordemBy: "equipment_model" },
    { title: "Cliente", ordemBy: "cpf_client" },
    { title: "Última visita", ordemBy: "updatedAt" },
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
            {props.equipmentsListToDisplay
              .map(equipment => (
                <TableRow hover tabIndex={-1} key={equipment.id_equipment}>
                  <TableCell>{equipment.id_equipment}</TableCell>
                  <TableCell>{equipment.equipment_model}</TableCell>
                  <TableCell>{equipment.cpf_client}</TableCell>
                  <TableCell className={classes.lastTableCell}>{equipment.updatedAt}
                    <LinkMenu id={equipment.id} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </LinkMenu>
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
