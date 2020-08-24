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

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active
                                    // direction={props.ordemAlfabetica ? "desc" : "asc"}
                                    // onClick={() => props.setOrdemAlfabetica(!props.ordemAlfabetica)}
                                >
                                    Nº série
                </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active
                                    // direction={props.ordemAlfabetica ? "desc" : "asc"}
                                    // onClick={() => props.setOrdemAlfabetica(!props.ordemAlfabetica)}
                                >
                                    Cliente
                  </TableSortLabel>
                            </TableCell>
                            <TableCell className={classes.tableCell}>
                                <TableSortLabel
                                    active
                                    // direction={props.ordemAlfabetica ? "desc" : "asc"}
                                    // onClick={() => props.setOrdemAlfabetica(!props.ordemAlfabetica)}
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
                                    <TableCell>{equipment.client}</TableCell>
                                    <TableCell className={classes.lastTableCell}>{equipment.last_collect_date}
                                        <Link to='/'>
                                            <FiMoreHorizontal size={24} color="#C4C4C4" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            )
                            )}
                        {props.equipmentsListToDisplay.length <= 0 ? <Typography className={classes.nullEquipament}>Este equipamento não foi encontrado </Typography> : null}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
