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
import nextInput from '../../services/nextInput';

export default function CadastroEquipamento(props) {
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

  // Referencias (próximo a declaração de um ponteiro nulo)
  const numeroSerieRef = useRef(null);
  const limitTempRef = useRef(null);
  const limitCorrRef = useRef(null);
  const limitTensRef = useRef(null);
  const cpfRef = useRef(null);
  const buttonSubmitRef = useRef(null);

  const relacionamentosRef = [ // relacimento entre name e ref citada no App.js
    { name: "numeroSerie", ref: limitTempRef },
    { name: "limiteTemperatura", ref: limitCorrRef },
    { name: "limiteCorrente", ref: limitTensRef },
    { name: "limiteTensao", ref: cpfRef },
    { name: "cpf", ref: buttonSubmitRef }
  ];

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
              inputRef={numeroSerieRef} // atribui um elemento a ref criada
              onKeyPress={e => nextInput(e, relacionamentosRef)} // manda a tecla apertada para a função analizar
            />

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
              // normalmente se usa ref, mas como o TextField não é um input 
              // o Material-UI disponibiliza o inputRef para acessarmos o input 
              // dentro de TextField
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
              label="CPF/CNPJ"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              autoComplete="off"
              inputRef={cpfRef}
              onKeyPress={e => nextInput(e, relacionamentosRef)} />
            <div>
              <Button type="submit"
                ref={buttonSubmitRef} // neste caso o button pode ser acessado 
                // diretamente por isso usamos ref={}
                className={classes.buttonRegister}>Cadastrar</Button>
            </div>
          </div>
        </form>
      </div>

    </React.Fragment>
  )
}
