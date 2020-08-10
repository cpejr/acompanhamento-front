import React, { useState, useRef } from 'react';

import {
  CssBaseline,
  Tab,
  Typography,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core"

import { useStyles } from './cadastroEquipamentoStyle';

export default function CadastroEquipamento(props) {
  const { nextInput } = props;

  const classes = useStyles();

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    numeroSerie: "",
    limiteTemperatura: "",
    limiteCorrente: "",
    limiteTensao: "",
    cpf: ""
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleSubmit(qualForm) {
    alert("Submit")
  }

  // Referencias
  const numeroSerieRef = useRef(null);
  const limitTempRef = useRef(null);
  const limitCorrRef = useRef(null);
  const limitTensRef = useRef(null);
  const cpfRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [
    { name: "numeroSerie", ref: limitTempRef },
    { name: "limiteTemperatura", ref: limitCorrRef },
    { name: "limiteCorrente", ref: limitTensRef },
    { name: "limiteTensao", ref: cpfRef },
    { name: "cpf", ref: buttonSubmitRef }
  ]

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo equipamento
        </Typography>

        <AppBar position="sticky" className={classes.appbar}>
          <Tab className={classes.titleTab} label="Novo Equipamento" />
        </AppBar>

        <form className={classes.form}
          onSubmit={() => handleSubmit("cadastroEquip")}>
          <div className={classes.containerForm}>
            <TextField
              name="numeroSerie"
              className={classes.inputs}
              value={formData.numeroSerie}
              onChange={handleChangeInput}
              label="Número da série"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              autoFocus
              inputRef={numeroSerieRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <TextField
              name="limiteTemperatura"
              className={classes.inputs}
              value={formData.limiteTemperatura}
              onChange={handleChangeInput}
              label="Limite TEMPERATURA"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              inputRef={limitTempRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <TextField
              name="limiteCorrente"
              className={classes.inputs}
              value={formData.limiteCorrente}
              onChange={handleChangeInput}
              label="Limite CORRENTE"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              inputRef={limitCorrRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <TextField
              name="limiteTensao"
              className={classes.inputs}
              value={formData.limiteTensao}
              onChange={handleChangeInput}
              label="Limite TENSÃO"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              inputRef={limitTensRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <TextField
              name="cpf"
              className={classes.inputs}
              value={formData.cpf}
              onChange={handleChangeInput}
              label="CPF"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputRef={cpfRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <div>
              <Button type="submit" ref={buttonSubmitRef}
                className={classes.botaocadastrar}>Cadastrar</Button>
            </div>
          </div>
        </form>
      </div>

    </React.Fragment>
  )
}
