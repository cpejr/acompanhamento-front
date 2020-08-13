import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';

const columns = [
    { id: 'name', label: 'Nome', minWidth: 170 },
    { id: 'funcao', label: 'Função', minWidth: 170 },
    { id: 'data', label: 'Última data ativa', minWidth: 170 },
];

// const rows = [
//     createData('antonio', 'funcionário', 20052020),
//     createData('izabela', 'cliente', 20052020),
//     createData('joao', 'cliente', 20052020),
//     createData('jota', 'administrador', 20052020),
//     createData('juliana', 'funcionário', 20052020),
//     createData('maiara', 'funcionário', 20052020),
//     createData('talles', 'cliente', 20052020),
//     createData('arthur', 'administrador', 20052020),
//     createData('pedro', 'cliente', 20052020),

// ];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function StickyHeadTable(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // const [values, setValues] = useState([{
    //     name: String,
    //     funcao: String,
    //     data: String,
    // }])
    //
    // useEffect(() => {
    //     const people = props.people;
    //
    //     const valuesPeople = people.map(people => {
    //         return {
    //             name: people.name,
    //             funcao: people.funcao,
    //             data: people.lastactive,
    //         }
    //     })
    //     setValues(valuesPeople)
    //     {console.log(values)}
    // }, [])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        position: 'relative',
                                        backgroundColor: '#2196F3'
                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.usersListToDisplay.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.usersListToDisplay.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
