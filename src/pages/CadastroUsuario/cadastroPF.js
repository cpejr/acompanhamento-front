import React from 'react';
import { useStyles } from './cadastroUsuarioStyle';
import { Button } from 'react-bootstrap';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid
} from '@material-ui/core';

function CadastroPF(props) {
  const { formData, handleChangeCheck, handleChangeInput, handleSubmit } = props;

  const classes = useStyles();

  return (
    <div>
      <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroPF")}>
        <Grid className={classes.formulario}>
          <TextField
            className={classes.campodeinfo}
            value={formData.nome}
            label="Nome Completo"
            name="nome"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.cpf}
            label="CPF"
            name="cpf"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.nascimento}
            label="Data de nascimento"
            name="nascimento"
            onChange={handleChangeInput}
            type="date"
            helperText="(Opcional)"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.telefone}
            label="Número de telefone"
            name="telefone"
            onChange={handleChangeInput}
            type="number"
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
            label="Endereço de e-mail"
            name="email"
            onChange={handleChangeInput}
            type="email"
            helperText="*Obrigatório"
            variant="filled" />
            
          <TextField
            className={classes.campodeinfo}
            value={formData.emailConfirmar}
            label="Confirmar e-mail"
            name="emailConfirmar"
            onChange={handleChangeInput}
            type="email"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.senha}
            label="Criar senha"
            name="senha"
            onChange={handleChangeInput}
            type="password"
            helperText="*Obrigatório"
            variant="filled"
          />
          
          <TextField
            className={classes.campodeinfo}
            value={formData.senhaConfirmar}
            label="Confirmar senha"
            name="SenhaConfirmar"
            onChange={handleChangeInput}
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
                color="primary" size="small"
              />
            }
            label="Desejo receber emails promocionais"
          />
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPF;
