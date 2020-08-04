import React from 'react';
import { useStyles } from './cadastroUsuarioStyle';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';

function CadastroPJ(props) {
  const classes = useStyles()

  return (
    <div>
      <form className={classes.allforms}>
        <Grid className={classes.formulario}>
          <TextField className={classes.campodeinfo} label="Nome da empresa" name="nomeEmpresa" type="text" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="CNPJ" name="cnpj" type="text" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Razão Social" name="razaoSocial" type="text" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Inscrição Estadual" name="inscricaoEstadual" type="text" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Número de telefone" name="phone" type="number" helperText="*Obrigatório" variant="filled" />
          <div>
            <Link to="/" type="submit" className={classes.link}>
              <Button className={classes.botaocadastrar}>Cadastrar</Button>
            </Link>
          </div>
        </Grid>
        <Grid className={classes.formulario2}>
          <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
          <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
          <FormControlLabel className={classes.checkbox} control={<Checkbox checked={props.formData.emailPromocional} onChange={props.handleChangeCheck} name="emailPromocional" color="primary" size="small" />} label="Desejo receber emails promocionais" />
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;