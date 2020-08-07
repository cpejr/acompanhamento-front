import React from 'react';
import { useStyles } from './cadastroUsuarioStyle';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button
} from '@material-ui/core';

function CadastroPJ(props) {
  const { formData, handleChangeCheck, handleChangeInput, handleSubmit } = props;

  const classes = useStyles();

  return (
    <div>
      <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroPJ")}>
        <Grid className={classes.formulario}>
          <TextField
            className={classes.campodeinfo}
            value={formData.nomeEmpresa}
            label="Nome da empresa"
            name="nomeEmpresa"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />

          <TextField
            className={classes.campodeinfo}
            value={formData.cnpj}
            label="CNPJ"
            name="cnpj"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />

          <TextField
            className={classes.campodeinfo}
            value={formData.razaoSocial}
            label="Razão Social"
            name="razaoSocial"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
            variant="filled"
          />

          <TextField
            className={classes.campodeinfo}
            value={formData.inscricaoEstadual}
            label="Inscrição Estadual"
            name="inscricaoEstadual"
            onChange={handleChangeInput}
            type="text"
            helperText="*Obrigatório"
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
            <Button type="submit" className={classes.botaocadastrar} >Cadastrar</Button>
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
            helperText="*Obrigatório" variant="filled"
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
            label="Desejo receber emails promocionais" />
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;
