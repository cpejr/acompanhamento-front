import React, { useRef } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import nextInput from '../../services/nextInput';

function CadastroPJ(props) {
  const { formData, handleChangeCheck, handleChangeInput, handleSubmit } = props;

  const classes = useStyles();

  const nomeEmpresaRef = useRef(null);
  const cnpjRef = useRef(null);
  const razaoSocialRef = useRef(null);
  const inscricaoEstadualRef = useRef(null);
  const telefoneRef = useRef(null);
  const emailRef = useRef(null);
  const emailConfirmarRef = useRef(null);
  const senhaRef = useRef(null);
  const senhaConfirmarRef = useRef(null);
  const emailPromocionalRef = useRef(null);
  const buttonRef = useRef(null);

  const relacionamentosRef = [
    { name: "nomeEmpresa", ref: cnpjRef },
    { name: "cnpj", ref: razaoSocialRef },
    { name: "razaoSocial", ref: inscricaoEstadualRef },
    { name: "inscricaoEstadual", ref: telefoneRef },
    { name: "telefone", ref: emailRef },
    { name: "email", ref: emailConfirmarRef },
    { name: "emailConfirmar", ref: senhaRef },
    { name: "senha", ref: senhaConfirmarRef },
    { name: "senhaConfirmar", ref: emailPromocionalRef },
    { name: "emailPromocional", ref: buttonRef }
  ];

  return (
    <div>
      <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroPJ")}>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={6} className={classes.formulario}>
            <TextField
              name="nomeEmpresa"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.nomeEmpresa}
              label="Nome da empresa"
              onChange={handleChangeInput}
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={nomeEmpresaRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="cnpj"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.cnpj}
              label="CNPJ"
              onChange={handleChangeInput}
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={cnpjRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="razaoSocial"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.razaoSocial}
              label="Razão Social"
              onChange={handleChangeInput}
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={razaoSocialRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="inscricaoEstadual"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.inscricaoEstadual}
              label="Inscrição Estadual"
              onChange={handleChangeInput}
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={inscricaoEstadualRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="telefone"
              className={classes.inputForm}
              value={formData.telefone}
              label="Número de telefone"
              onChange={handleChangeInput}
              type="number"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={telefoneRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
            />
          </Grid>
          <Grid item xs={12} sm={6} className={classes.formulario2}>
            <TextField
              name="email"
              className={classes.inputForm}
              value={formData.email}
              onChange={handleChangeInput}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório" variant="filled"
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
                  color="primary" size="small"
                  inputRef={emailPromocionalRef}
                  onKeyPress={e => nextInput(e, relacionamentosRef)}
                />
              }
              label="Desejo receber emails promocionais" />
          </Grid>
          <Button type="submit" ref={buttonRef} className={classes.botaocadastrar} >Cadastrar</Button>
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;
