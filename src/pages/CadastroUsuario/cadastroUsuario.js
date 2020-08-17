import React, { useState } from 'react';
import './cadastroUsuarioStyle';

import {
  CssBaseline,
  Typography,
  AppBar,
  Box,
  Tabs,
  Tab,
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';

import { useStyles } from './cadastroUsuarioStyle';
import CadastroPF from './cadastroPF';
import CadastroPJ from './cadastroPJ';
import CadastroFuncionario from './cadastroFuncionario';
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
  const [value, setValue] = React.useState(0);

  const [formData, setFormData] = useState({ emailPromocional: true });

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

  function handleSubmit(qualForm) {
    if (qualForm === "cadastroFuncionario") alert("Você é funcionario");
    else if (qualForm === "cadastroPF") alert("Você é Pessoa Física");
    else if (qualForm === "cadastroPJ") alert("Você é Pessoa Jurídica");
    else if (qualForm === "cadastroEquip") alert("Equipamento Cadastrado");
    else alert("Erro")
  }

  useEffect(() => { console.log(formData) }, [formData]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.cabecario}>
          <Typography variant="h3" className={classes.tittle}>
            Cadastro de um novo usuário
          </Typography>
        </div>

        <FormControl variant="outlined" className={classes.select}>
        <InputLabel id="label-select">Tipo de usuário que será cadastrado</InputLabel>
        <Select
          labelId="label-select"
          native
          value={value}
          onChange={handleChange}
        >
          <option aria-label="None" value="" />
          <option value={value}>Cliente Pessoa Jurídica</option>
          <option value={value}>Cliente Pessoa Física</option>
          <option value={value}>Funcionário</option>
        </Select>
        </FormControl>

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
              <CadastroPJ
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>
          </div>

          <div>
            <TabPanel value={value} index={1}>
              <CadastroPF
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>
          </div>

          <div>
            <TabPanel value={value} index={2}>
              <CadastroFuncionario
                handleChangeCheck={handleChangeCheck}
                handleChangeInput={handleChangeInput}
                formData={formData}
                handleSubmit={handleSubmit} />
            </TabPanel>
          </div>

        </div>
        
        


      </div>
    </React.Fragment>
  )
}
