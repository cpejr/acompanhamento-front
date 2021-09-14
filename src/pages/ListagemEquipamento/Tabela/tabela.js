import React, { useContext } from 'react';
import { useStyles } from './tabelaStyle';
import {
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography
} from '@material-ui/core';
import history from '../../../history';
import { LoginContext } from '../../../context/LoginContext';

export default function StickyHeadTable(props) {

  const classes = useStyles();
  const { ordem, setOrdem } = props;
  const { IsClient } = useContext(LoginContext);
  let headerItems = [];

    if(!IsClient()){
      headerItems = [
        { title: "Código do Equipamento", ordemBy: "equipment_code" },
        { title: "Nome cliente", ordemBy: "client_name" },
        { title: "Última visita", ordemBy: "last_visit" }
      ]
    }
    if(IsClient()){
      headerItems = [
        { title: "Código do Equipamento", ordemBy: "equipment_code" },
        { title: "Última visita", ordemBy: "last_visit" }
      ]
    }

  function getNameClient(clientId){
    const user = props.all_users.filter(client => client.id === clientId);
    if(user[0]) return user[0].name;
    return " ";
  };
  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader>

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

              <TableCell className={classes.tableCell} style={{ textAlign: "center" }} >
                Ações
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {props.equipmentsListToDisplay

              .map(equipment => (

                <TableRow hover tabIndex={-1} key={equipment.equipment_code}>

                  <TableCell>{equipment.equipment_code}</TableCell>

                  {!IsClient() && <TableCell>{getNameClient(equipment.id_client)}</TableCell>}

                  <TableCell>{equipment.updatedAt}</TableCell>

                  <TableCell className={classes.lastTableCell} >
                    <Button
                      onClick={() => history.push(`/ae/${equipment.id}`)}
                      variant="outlined"
                      disableElevation
                      className={classes.buttonAdd}
                    >
                      Detalhes
                    </Button>

                    <Button
                      onClick={() => history.push(`/funcionamentoequipamento/${equipment.id}`)}
                      variant="outlined"
                      disableElevation
                      className={classes.buttonAdd_2}
                    >
                      Dados
                    </Button>

                    { !IsClient() && (
                      <Button
                        onClick={() => history.push(`/manutencao/${equipment.id}`)}
                        variant="outlined"
                        disableElevation
                        className={classes.buttonAdd_3}
                      >
                        Manutenções
                      </Button>
                    )}
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
