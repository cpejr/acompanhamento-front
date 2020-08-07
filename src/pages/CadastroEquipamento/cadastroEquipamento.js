import React, { useState, useEffect } from 'react';

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
  const classes = useStyles();

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

  useEffect(() => { console.log(formData) }, [formData])

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo equipamento
        </Typography>

        <AppBar position="sticky" className={classes.appbar}>
          {/* <Tabs aria-label="simple tabs example"  > */}
          <Tab className={classes.titleTab} label="Novo Equipamento" />
          {/* </Tabs> */}
        </AppBar>

        <form className={classes.form} onSubmit={() => handleSubmit("cadastroEquip")}>
          <div className={classes.containerForm}>
            <TextField
              className={classes.inputs}
              name="numeroSerie"
              value={formData.numeroSerie}
              onChange={handleChangeInput}
              label="Número da série"
              type="text"
              helperText="*Obrigatório"
              variant="filled" />
            <TextField
              className={classes.inputs}
              name="limiteTemperatura"
              value={formData.limiteTemperatura}
              onChange={handleChangeInput}
              label="Limite TEMPERATURA"
              type="text"
              helperText="*Obrigatório"
              variant="filled" />
            <TextField
              className={classes.inputs}
              name="limiteCorrente"
              value={formData.limiteCorrente}
              onChange={handleChangeInput}
              label="Limite CORRENTE"
              type="text"
              helperText="*Obrigatório"
              variant="filled" />
            <TextField
              className={classes.inputs}
              name="limiteTensao"
              value={formData.limiteTensao}
              onChange={handleChangeInput}
              label="Limite TENSÃO"
              type="text"
              helperText="*Obrigatório"
              variant="filled" />
            <TextField
              className={classes.inputs}
              name="cpf"
              value={formData.cpf}
              onChange={handleChangeInput}
              label="CPF"
              type="text"
              helperText="*Obrigatório"
              variant="filled" />
            <div>
              <Button type="submit" className={classes.botaocadastrar}>Cadastrar</Button>
            </div>
          </div>
        </form>
      </div>

    </React.Fragment>
  )
}
