import React from 'react';
import { Link } from 'react-router-dom';
import {FiMail, FiLock } from "react-icons/fi"
import {
  TextField,
  CssBaseline,
  Typography,
  OutlinedInput,
  Button,
  InputAdornment,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useStyles } from './definiçaosenhastyle'

export default function DefiniçãoSenha() {
  const classes = useStyles();

  
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.definiçaosenhaLogo}></div>

        <div className={classes.definiçaosenhaForm}>
          <Typography className={classes.title}>Definição de Nova Senha!</Typography>

          <TextField className={classes.input}
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <FiLock size={24} className={classes.icon} />
              </InputAdornment>,
            }}
            variant="outlined"
          />

          <OutlinedInput className={classes.input}
            startAdornment={<InputAdornment position="start">
              <FiLock size={24} className={classes.icon} />
            </InputAdornment>}
            labelWidth={0}
          />
      
            <Button className={classes.buttonDefiniçao}>
              Confirmar nova senha
            </Button>
        </div>
      </div>
    </React.Fragment >

  );
}
