import React, { useState, useEffect } from 'react';

import {
  CssBaseline,
  Tab,
  Typography,
  Tabs,
  AppBar,
  TextField,
  Grid,
  Button
} from "@material-ui/core"

import { useStyles } from './cadastroEquipamentoStyle';

export default function CadastroEquipamento(props) {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    numeroSerie: String,
    limiteTemperatura: String,
    limiteCorrente: String,
    limiteTensao: String,
    cpf: String
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
        <Typography variant="h3" className={classes.tittle}>
          Cadastro de um novo equipamento
        </Typography>
        <div className={classes.formulariointeiro}>
          <div>
            <AppBar position="" className={classes.appbar}>
              <Tabs aria-label="simple tabs example">
                <Tab className={classes.novoequipamento} label="Novo Equipamento" />
              </Tabs>
            </AppBar>
          </div>
        </div>

        <div>
          <div>
            <form className={classes.allforms} onSubmit={() => handleSubmit("cadastroEquip")}>
              <Grid className={classes.formulario}>
                <TextField
                  className={classes.campodeinfo}
                  name="numeroSerie"
                  value={formData.numeroSerie}
                  onChange={handleChangeInput}
                  label="Número da série"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled" />
                <TextField
                  className={classes.campodeinfo}
                  name="limiteTemperatura"
                  value={formData.limiteTemperatura}
                  onChange={handleChangeInput}
                  label="Limite TEMPERATURA"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled" />
                <TextField
                  className={classes.campodeinfo}
                  name="limiteCorrente"
                  value={formData.limiteCorrente}
                  onChange={handleChangeInput}
                  label="Limite CORRENTE"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled" />
                <TextField
                  className={classes.campodeinfo}
                  name="limiteTensao"
                  value={formData.limiteTensao}
                  onChange={handleChangeInput}
                  label="Limite TENSÃO"
                  type="text"
                  helperText="*Obrigatório"
                  variant="filled" />
                <TextField
                  className={classes.campodeinfo}
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
              </Grid>
            </form>
          </div>
        </div>
      </div>

    </React.Fragment>
  )
}
