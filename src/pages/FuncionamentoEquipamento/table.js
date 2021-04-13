import React from 'react';
import {
  CssBaseline,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns/esm';
import { parseISO } from 'date-fns';

import { useStyles } from './funcionamentoequipamentoStyle';

export default function ({ equipment }) {
  const classes = useStyles();

  const [dataToTable, setDataToTable] = React.useState([
    { name: "", value: "" },
  ])

  React.useEffect(() => {
    if (Object.keys(equipment).length !== 0) {
      setDataToTable([
        { name: "Nº de Sêrie", value: equipment.id_equipment },
        { name: "Modelo do equipamento", value: equipment.equipment_model },
        { name: "Data de Instalação", value: format(parseISO(equipment.instalation_date), "PPP", { locale: ptBR }) },
        { name: "Última Atualização", value: format(parseISO(equipment.updatedAt), "PPP", { locale: ptBR }) },
        { name: "Observações", value: equipment.observation },
      ])
    }
  }, [equipment])

  if (Object.keys(equipment).length === 0) {
    return (
      <div className={classes.center}>
        <h2>Carregando...</h2>
      </div>
    )
  }

  return (
    <>
      <CssBaseline />
      <TableContainer className={classes.container}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>Propriedade</TableCell>
              <TableCell className={classes.tableCell}>Valor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataToTable.map(({ name, value }) => (
              <TableRow hover tabIndex={-1} key={name}>
                <TableCell>{name}</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
