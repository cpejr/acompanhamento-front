import React, { useState } from 'react';
import {
  CssBaseline,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  Paper,
  MenuItem,
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import CadastroPF from './cadastroPF';
import CadastroPJ from './cadastroPJ';
import CadastroFuncionario from './cadastroFuncionario';

export default function CadastroUsuario() {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    emailPromocional: true,
    tipo: "",
  });

  function TabPanel(props) {
    const { children, value, index } = props;
    return value === index && children;
  }

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleChangeCheck(event) {
    const { checked } = event.target;
    setFormData({ ...formData, emailPromocional: checked });
  }

  function handleSubmit(qualForm) {
    if (qualForm === "cadastroFuncionario") alert("Você é funcionario");
    else if (qualForm === "cadastroPF") alert("Você é Pessoa Física");
    else if (qualForm === "cadastroPJ") alert("Você é Pessoa Jurídica");
    else if (qualForm === "cadastroEquip") alert("Equipamento Cadastrado");
    else alert("Erro")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>

        <Typography variant="h3" className={classes.titulo}>
          Cadastro de um novo usuário
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>

          <FormControl variant="filled" className={classes.inputTipo}>
            <InputLabel id="tipo">Tipo de Usuário</InputLabel>
            <Select
              labelId="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChangeInput}
            >
              <MenuItem value="">Selecione:</MenuItem>
              <MenuItem value="pj" >Pessoa Jurídica</MenuItem>
              <MenuItem value="pf" >Pessoa Física</MenuItem>
              <MenuItem value="funcionario" >Funcionário</MenuItem>
            </Select>
          </FormControl>

          <Box className={classes.Subform}>
            <TabPanel value={formData.tipo} index="">
              <Typography className={classes.tituloDoTipo}>
                Escolha um tipo de Usuário para continuar.
              </Typography>
            </TabPanel>

            <TabPanel value={formData.tipo} index="pj">
              <Typography className={classes.tituloDoTipo}>
                Dados da Empresa
              </Typography>
              <CadastroPJ
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>

            <TabPanel value={formData.tipo} index="pf">
              <Typography className={classes.tituloDoTipo}>
                Dados Pessoais
              </Typography>
              <CadastroPF
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>

            <TabPanel value={formData.tipo} index="funcionario">
              <Typography className={classes.tituloDoTipo}>
                Dados Pessoais
              </Typography>
              <CadastroFuncionario
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>
          </Box>

        </Paper>
      </div>
    </React.Fragment >
  )
}
