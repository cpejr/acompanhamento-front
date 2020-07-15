import React from 'react';
import {
  CssBaseline,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",

    marginTop: "50px"
  }
})

export default function Login() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> {/* Reseta todo estilo padrão do navegador (margens e padding) */}

      <div className={classes.root}> {/* Envolve toda página */}

        <Typography variant="h3">Página de Login: Login</Typography>

      </div>

    </React.Fragment>
  );
}
