import React, { useState } from 'react';
import './cadastroUsuarioStyle';

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {
  Grid,
  CssBaseline,
  Typography,
  AppBar,
  Box,
  Tabs,
  Tab,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import CadastroPF from './cadastroPF';
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function CadastroUsuario() {

  const classes = useStyles();
  const [state, setState] = React.useState({ checkedA: true, checkedB: true, checkedC: true });
  const [value, setValue] = React.useState(0);

  const [formData, setFormData] = useState({ emailPromocional: true })

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };

  const handleChangeCheck = (event) => {
    const { checked } = event.target;

    setFormData({ ...formData, emailPromocional: checked });
  };

  function handleChangeInput(event) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => { console.log(formData) }, [formData])

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.tittle}>
          Cadastro de um novo usuário
        </Typography>
        <div className={classes.formulariointeiro}>
          <div>
            <AppBar position="" className={classes.appbar}>
              <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                <Tab className={classes.typeuser} label="Cliente Pessoa Jurídica" {...a11yProps(0)} />
                <Tab className={classes.typeuser} label="Cliente Pessoa Física" {...a11yProps(1)} />
                <Tab className={classes.typeuser} label="Funcionário" {...a11yProps(2)} />
              </Tabs>
            </AppBar>
          </div>
          <div>
            <TabPanel value={value} index={0}>
              <div className={classes.allforms}>
                <form className={classes.formulario}>
                  <TextField className={classes.campodeinfo} label="Nome da empresa" onChange={handleChangeInput} name="nomeEmpresa" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="CNPJ" name="cnpj" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Razão Social" name="razaoSocial" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Inscrição Estadual" name="inscricaoEstadual" onChange={handleChangeInput} type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Número de telefone" name="phone" onChange={handleChangeInput} type="number" helperText="*Obrigatório" variant="filled" />
                </form>
                <form className={classes.formulario2}>
                  <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
                  <FormControlLabel className={classes.checkbox} control={<Checkbox checked={formData.emailPromocional} onChange={handleChangeCheck} name="emailPromocional" color="primary" size="small" />} label="Desejo receber emails promocionais" />
                </form>
              </div>
            </TabPanel>
          </div>
          <TabPanel value={value} index={1}>
            <CadastroPF handleChangeCheck={handleChangeCheck} handleChangeInput={handleChangeInput} formData={formData} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <div className={classes.allforms}>
              <form className={classes.formulario}>
                <TextField className={classes.campodeinfo} label="Nome Completo" type="text" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="CPF" type="text" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="Data de nascimento" type="date" helperText="(Opcional)" variant="filled" />
                <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="Situação" type="text" helperText="*Obrigatório" variant="filled" />
              </form>
              <form className={classes.formulario2}>
                <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
                <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
                <FormControlLabel className={classes.checkbox} control={<Checkbox checked={state.checkedC} onChange={handleChangeCheck} name="checkedC" color="primary" size="small" />} label="Desejo receber emails promocionais" />

              </form>
            </div>
          </TabPanel>

          <div>
            <Link to="/" className={classes.link}>
              <Button className={classes.botaocadastrar}>Cadastrar</Button>
            </Link>
          </div>

        </div>
      </div>
    </React.Fragment>
  )
}
