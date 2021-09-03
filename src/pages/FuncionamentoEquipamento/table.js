import React, { useEffect, useContext , useState} from 'react';
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
import api from '../../services/api';
import { LoginContext } from '../../context/LoginContext';

export default function ({ equipment }) {
  const classes = useStyles();
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();
  const [dataToTable, setDataToTable] = useState([
    { name: "", value: "" },
  ]);

  useEffect(() => {
    if (equipment.id_model) {
      api.get(`model/${equipment.id_model}`, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          const nameModel = response.data.model.modelName;
          setDataToTable([
            { name: "Código do Equipamento", value: equipment.equipment_code },
            { name: "Modelo do Equipamento", value: nameModel },
            { name: "Última Atualização", value: format(parseISO(equipment.updatedAt), "PPP", { locale: ptBR }) },
            { name: "Observações", value: equipment.observation },
          ])
        });
    }
  }, [equipment, accessToken])

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
