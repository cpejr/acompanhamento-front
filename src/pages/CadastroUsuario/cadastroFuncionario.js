import React from 'react';
import { useStyles } from './cadastroUsuarioStyle';
import { Button } from 'react-bootstrap';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';

function CadastroFuncionario(props) {
  const { formData, handleChangeCheck, handleChangeInput, handleSubmit } = props;

  const classes = useStyles();

  return (
    <div>
      <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroFuncionario")}>
        <Grid className={classes.formulario}>
          <TextField 
            className={classes.campodeinfo}
            value={formData.nome}
            name="nome"
            onChange={handleChangeInput}
            label="Nome Completo"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />
            
          <TextField
            className={classes.campodeinfo}
            value={formData.cpf}
            name="cpf"
            onChange={handleChangeInput}
            label="CPF" type="text"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.nascimento}
            name="nascimento"
            onChange={handleChangeInput}
            label="Data de nascimento"
            type="date"
            helperText="(Opcional)"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.telefone}
            name="telefone"
            onChange={handleChangeInput}
            label="Número de telefone"
            type="number"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.situacao}
            name="situacao"
            onChange={handleChangeInput}
            label="Situação"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <div>
            <Button type="submit" className={classes.botaocadastrar}>Cadastrar</Button>
          </div>
        </Grid>
        
        <Grid className={classes.formulario2}>
          
          <TextField
            className={classes.campodeinfo}
            value={formData.email}
            name="email"
            onChange={handleChangeInput}
            label="Endereço de e-mail"
            type="email"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.emailConfirmar}
            name="emailConfirmar"
            onChange={handleChangeInput}
            label="Confirmar e-mail"
            type="email"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.senha}
            name="senha"
            onChange={handleChangeInput}
            label="Criar senha"
            type="password"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.senhaConfirmar}
            name="senhaConfirmar"
            onChange={handleChangeInput}
            label="Confirmar senha"
            type="password"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                checked={formData.emailPromocional}
                onChange={handleChangeCheck}
                name="emailPromocional"
                color="primary"
                size="small"
              />
            }
            label="Desejo receber emails promocionais"
          />
        </Grid>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
