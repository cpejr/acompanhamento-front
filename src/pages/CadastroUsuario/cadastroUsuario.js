import React from 'react';
import './cadastroUsuarioStyle';

import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.tittle}>
          Cadastro de um novo usuário
        </Typography>
        <div className={classes.formulariointeiro}>
          <AppBar position="" className={classes.appbar}>
            <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab className={classes.typeuser} label="Cliente Pessoa Jurídica" {...a11yProps(0)} />
              <Tab className={classes.typeuser} label="Cliente Pessoa Física" {...a11yProps(1)} />
              <Tab className={classes.typeuser} label="Funcionário" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Grid>
              <Grid className={classes.allforms}>
                <form className={classes.formulario}>
                  <TextField className={classes.campodeinfo} label="Nome da empresa" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="CNPJ" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Razão Social" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Inscrição Estadual" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
                </form>
                <Grid>
                  <form className={classes.formulario}>
                    <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
          <Grid>
              <Grid className={classes.allforms}>
                <form className={classes.formulario}>
                  <TextField className={classes.campodeinfo} label="Nome Completo" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="CPF" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Data de nascimento" type="date" helperText="(Opcional)" variant="filled"/>
                  <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
                </form>
                <Grid>
                  <form className={classes.formulario}>
                    <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    </form>
                </Grid>
              </Grid>
              <FormControlLabel control={ <Checkbox  name="checkedB" color="primary"/>} label="Desejo receber emails promocionais"/>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
        <Grid>
              <Grid className={classes.allforms}>
                <form className={classes.formulario}>
                  <TextField className={classes.campodeinfo} label="Nome Completo" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="CPF" type="text" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Data de nascimento" type="date" helperText="(Opcional)" variant="filled"/>
                  <TextField className={classes.campodeinfo} label="Número de telefone" type="number" helperText="*Obrigatório" variant="filled" />
                  <TextField className={classes.campodeinfo} label="Situação" type="text" helperText="*Obrigatório" variant="filled" />
                </form>
                <Grid>
                  <form className={classes.formulario}>
                    <TextField className={classes.campodeinfo} label="Endereço de e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar e-mail" type="email" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Criar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    <TextField className={classes.campodeinfo} label="Confirmar senha" type="password" helperText="*Obrigatório" variant="filled" />
                    </form>
                </Grid>
              </Grid>
              <FormControlLabel control={ <Checkbox  name="checkedB" color="primary"/>} label="Desejo receber emails promocionais"/>       
              </Grid>
        </TabPanel>
 
        <Link to="/" className={classes.link}>
          <Button className={classes.botaocadastrar}>Cadastrar</Button>
        </Link>

        </div>
      </div>
    </React.Fragment>
  )
}
