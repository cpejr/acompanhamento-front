import React from 'react';
import './listagemEquipamentoStyle';

import { Link } from "react-router-dom"

import {Typography} from "@material-ui/core"; 

import {
  Button
} from "@material-ui/core";

import { useStyles } from './listagemEquipamentoStyle'; 
 
export default function ListagemEquipamento(props) { 
  const classes = useStyles(); 
 
  return ( 
    <div className={classes.root}> 
      <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Usuários
          </Typography>
          <Button component={Link} to="/cadastroequipamento" className={classes.buttonAdd}>
            Adicionar Novo
          </Button>
    </div>
 
    </div> 
  ) 
}
