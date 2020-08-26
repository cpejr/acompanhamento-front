import React, { useRef } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  useMediaQuery,
  Button
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import nextInput from '../../services/nextInput';

function CadastroFuncionario(props) {
  const { formData, handleChangeCheck, handleChangeInput, handleSubmit } = props;

  const classes = useStyles();

  const nomeRef = useRef(null);
  const cpfRef = useRef(null);
  const nascimentoRef = useRef(null);
  const telefoneRef = useRef(null);
  const situacaoRef = useRef(null);
  const emailRef = useRef(null);
  const emailConfirmarRef = useRef(null);
  const senhaRef = useRef(null);
  const senhaConfirmarRef = useRef(null);
  const emailPromocionalRef = useRef(null);
  const buttonRef = useRef(null);

  const relacionamentosRef = [
    { name: "nome", ref: cpfRef },
    { name: "cpf", ref: nascimentoRef },
    { name: "nascimento", ref: telefoneRef },
    { name: "telefone", ref: situacaoRef },
    { name: "situacao", ref: emailRef },
    { name: "email", ref: emailConfirmarRef },
    { name: "emailConfirmar", ref: senhaRef },
    { name: "senha", ref: senhaConfirmarRef },
    { name: "senhaConfirmar", ref: emailPromocionalRef },
    { name: "emailPromocional", ref: buttonRef }
  ];

  return (
    <div>
      <form onSubmit={() => handleSubmit("cadastroFuncionario")}>
        <Grid container spacing={useMediaQuery('(min-width:960px)') ? 5 : 0}>
          <Grid item xs={12} md={6} >
            <TextField
              name="nome"
              className={classes.inputForm}
              value={formData.nome}
              onChange={handleChangeInput}
              label="Nome Completo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={nomeRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="cpf"
              className={classes.inputForm}
              value={formData.cpf}
              onChange={handleChangeInput}
              label="CPF" type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={cpfRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="nascimento"
              className={classes.inputForm}
              label="Data de Nascimento"
              defaultValue="2017-05-24"
              value={formData.nascimento}
              onChange={handleChangeInput}
              helperText="(Opcional)"
              variant="filled"
              type="date"
              inputRef={nascimentoRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="telefone"
              className={classes.inputForm}
              value={formData.telefone}
              onChange={handleChangeInput}
              label="Número de telefone"
              type="number"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={telefoneRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="situacao"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.situacao}
              onChange={handleChangeInput}
              label="Situação"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={situacaoRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />
          </Grid>
          <Grid item xs={12} md={6} >
            <TextField
              name="email"
              className={classes.inputForm}
              value={formData.email}
              onChange={handleChangeInput}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={emailRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="emailConfirmar"
              className={classes.inputForm}
              value={formData.emailConfirmar}
              onChange={handleChangeInput}
              label="Confirmar e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={emailConfirmarRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="senha"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.senha}
              onChange={handleChangeInput}
              label="Criar senha"
              type="password"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={senhaRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="senhaConfirmar"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.senhaConfirmar}
              onChange={handleChangeInput}
              label="Confirmar senha"
              type="password"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={senhaConfirmarRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  name="emailPromocional"
                  checked={formData.emailPromocional}
                  onChange={handleChangeCheck}
                  color="primary"
                  size="small"
                  inputRef={emailPromocionalRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
                />
              }
              label="Desejo receber emails promocionais"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" ref={buttonRef} className={classes.buttonRegister}>Cadastrar</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
