import React from 'react';
import { useStyles } from './tabelaStyle';
import {
  Paper,
  Button,
  Link,
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
import history from '../../../history'
import LinkMenu from '../../../components/LinkMenu'

export default function StickyHeadTable(props) {
  
  const classes = useStyles();
  const { ordem, setOrdem } = props;
  const [openMenu, setOpenMenu] = React.useState("");
  

  const headerItems = [
    { title: "Código do Equipamento", ordemBy: "equipment_code" },
    // { title: "Modelo", ordemBy: "id_model" },
    { title: "CPF cliente", ordemBy: "cpf_client" },
    { title: "Última visita", ordemBy: "last_visit" },
    { title: "Ações"},
  ]


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
            </TableRow>
          </TableHead>

          <TableBody>
            {props.equipmentsListToDisplay

              .map(equipment => (

                <TableRow hover tabIndex={-1} key={equipment.equipment_code}>
                  
                  <TableCell>{equipment.equipment_code}</TableCell>

                  <TableCell>{equipment.cpf_client}</TableCell>

                  <TableCell className={classes.lastTableCell}>{equipment.updatedAt}
                    {/* <LinkMenu id={equipment.id} openMenu={openMenu} setOpenMenu={setOpenMenu}>
                      <FiMoreHorizontal size={24} color="#C4C4C4" />
                    </LinkMenu> */}
                  </TableCell>

                  <TableCell> 
                    <Button
                      component={Link}
                      onClick={ ()=> history.push(`/ae/${equipment.id}`)}
                      variant="outlined"
                      disableElevation
                      className={classes.buttonAdd}
                    >
                      Detalhes
                    </Button>
          
                    <Button
                      component={Link}
                      onClick={ ()=> history.push(`/funcionamentoequipamento/${equipment.id}`)}
                      variant="outlined"
                      disableElevation
                      className={classes.buttonAdd_2}
                    >
                      Dados
                    </Button>

                    <Button
                      component={Link}
                      // to={`/funcionamentoequipamento/${equipment.id}`}
                      onClick={ ()=> history.push(`/manutencao/${equipment.id}`)}
                      variant="outlined"
                      disableElevation
                      className={classes.buttonAdd_3}
                    >
                     Manutenções
                    </Button>

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
