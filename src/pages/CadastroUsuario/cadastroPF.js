import React from 'react';
import { useStyles } from './cadastroUsuarioStyle';
import {
  TextField,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

function CadastroPF(props) {
  const classes = useStyles()

  return (
    <div className={classes.allforms}>
      <form className={classes.formulario}>
        <TextField className={classes.campodeinfo} label="Nome Completo" onChange={props.handleChangeInput} name="NomePF" type="text" helperText="*Obrigatório" variant="filled" />
        <TextField className={classes.campodeinfo} label="CPF" type="text" helperText="*Obrigatório" variant="filled" />
        <TextField className={classes.campodeinfo} label="Data de nascimento" type="date" helperText="(Opcional)" variant="filled" />
        <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
      </form>
      <form className={classes.formulario2}>
        <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
        <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
        <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
        <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
        <FormControlLabel className={classes.checkbox} control={<Checkbox checked={props.formData.emailPromocional} onChange={props.handleChangeCheck} name="emailPromocional" color="primary" size="small" />} label="Desejo receber emails promocionais" />
      </form>
    </div>
  );
}

export default CadastroPF;
