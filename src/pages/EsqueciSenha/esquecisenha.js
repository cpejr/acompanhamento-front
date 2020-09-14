import React from 'react';
import { Link } from 'react-router-dom';
import { FiMail} from "react-icons/fi"
import {
  TextField,
  CssBaseline,
  Typography,
  Button
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import { useStyles } from './esquecisenhastyle'
export default function EsqueciSenha() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> 
      <div className={classes.root}> 
        <div className={classes.esquecisenhaLogo}></div>

        <div className={classes.esquecisenhaBox}>

          <Typography className={classes.title}>Esqueci minha senha!</Typography>

          <TextField className={classes.email}

            id="outlined-start-adornment"
            InputProps={{
              startAdornment: <InputAdornment position="start">
                <FiMail size={24} className={classes.icon} />
              </InputAdornment>,
            }}
            variant="outlined"
          />

          <div>
            <Button className={classes.buttonCodigo} component={Link} to="/">Enviar Código</Button>
          </div>

        </div>
      </div>

    </React.Fragment>

  );
}
