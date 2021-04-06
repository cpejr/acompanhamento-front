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

  const [formType, setFormType] = useState("");
  const [formData, setFormData] = useState({
    emailPromocional: true,
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
  }

  function handleChangeCheck(event) {
    const { checked } = event.target;
    setFormData({ ...formData, emailPromocional: checked });
  }

  async function handleSubmit(qualForm) {
    if (qualForm === "cadastroFuncionario") await alert("Você é funcionario");
    else if (qualForm === "cadastroPF") await alert("Você é Pessoa Física");
    else if (qualForm === "cadastroPJ") await alert("Você é Pessoa Jurídica");
    else if (qualForm === "cadastroEquip") await alert("Equipamento Cadastrado");
    else alert("Erro")
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>

        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo usuário
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>

          <FormControl variant="filled" className={classes.inputType}>
            <InputLabel id="tipo">Tipo de Usuário</InputLabel>
            <Select
              labelId="tipo"
              value={formType}
              onChange={(e) => setFormType(e.target.value)}
            >
              <MenuItem value="">Selecione:</MenuItem>
              <MenuItem value="pj" >Pessoa Jurídica</MenuItem>
              <MenuItem value="pf" >Pessoa Física</MenuItem>
              <MenuItem value="funcionario" >Funcionário</MenuItem>
            </Select>
          </FormControl>

          <Box className={classes.Subform}>

            {formType === '' && <div>
              <Typography className={classes.titleType}>
                Escolha um tipo de Usuário para continuar.
              </Typography>
            </div>}

            {formType === 'pj' && <div>
              <Typography className={classes.titleType}>
                Dados da Empresa
              </Typography>
              <CadastroPJ
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit}
                mode={'create'}
              />
            </div>}

            {formType === "pf" && <div>
              <Typography className={classes.titleType}>
                Dados Pessoais
              </Typography>
              <CadastroPF
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit}
                mode={'create'}
              />
            </div>}

            {formType === "funcionario" && <div>
              <Typography className={classes.titleType}>
                Dados Pessoais
              </Typography>
              <CadastroFuncionario
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} 
                mode={'create'}
              />
            </div>}

          </Box>

        </Paper>
      </div>
    </React.Fragment >
  )
}
