import React, { useRef } from 'react';
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  useMediaQuery
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import nextInput from '../../services/nextInput';

function CadastroPJ(props) {
  const { handleChangeCheck, handleSubmit, formData, handleChangeInput, mode } = props;

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
    <form onSubmit={() => handleSubmit("cadastroPJ")}>
      <Grid container spacing={useMediaQuery('(min-width:960px)') ? 5 : 0}>
        <Grid item xs={12} md={6} >
          <TextField
            name="nomeEmpresa"
            autoComplete="off"
            className={classes.inputForm}
            value={formData.name}
            onChange={handleChangeInput}
            label="Nome da empresa"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
            disabled= {mode === 'view'}
            inputRef={nomeEmpresaRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
          />

          <TextField
            name="cnpj"
            autoComplete="off"
            className={classes.inputForm}
            value={formData.cnpj}
            onChange={handleChangeInput}
            label="CNPJ"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
            disabled= {!(mode === 'create')}
            inputRef={cnpjRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
          />

          <TextField
            name="razaoSocial"
            autoComplete="off"
            className={classes.inputForm}
            value={formData.razaoSocial}
            onChange={handleChangeInput}
            label="Razão Social"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
            disabled= {!(mode === 'create')}
            inputRef={razaoSocialRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
          />

          <TextField
            name="inscricaoEstadual"
            autoComplete="off"
            className={classes.inputForm}
            value={formData.inscricaoEstadual}
            onChange={handleChangeInput}
            label="Inscrição Estadual"
            type="text"
            helperText="*Obrigatório"
            variant="filled"
            disabled= {!(mode === 'create')}
            inputRef={inscricaoEstadualRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
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
            disabled= {mode === 'view'}
            inputRef={telefoneRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
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
            disabled= {!(mode === 'create')}
            inputRef={emailRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
          />

          {mode === 'create' &&
            <>
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
            </>
          }

          {handleChangeCheck && <FormControlLabel
            className={classes.checkbox}
            control={
              <Checkbox
                name="emailPromocional"
                checked={formData.emailPromocional}
                onChange={handleChangeCheck}
                color="primary"
                size="small"
                disabled={mode === 'view'}
                inputRef={emailPromocionalRef}
                onKeyPress={e => nextInput(e, relacionamentosRef)}
              />
            }
            label="Desejo receber emails promocionais" />}
        </Grid>
        {mode === 'create' &&
          <Grid item xs={12}>
            <Button type="submit"
                    ref={buttonRef} className={classes.buttonRegister}>
              Cadastrar
            </Button>
          </Grid>
        }
      </Grid>

    </form>
  );
}

export default CadastroPJ;
