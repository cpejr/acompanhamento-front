import React from 'react';
import { Link } from 'react-router-dom';
import {
  CssBaseline,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core'

const useStyles = makeStyles({
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column"
  },
  link: {
    textDecoration: "none",
  },
  button: {
    color: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    width: "21rem",
    height: "5rem",
    backgroundColor: "#FE2121",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    borderRadius: "2px"
  }
})

export default function Home() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline /> {/* Reseta todo estilo padrão do navegador */}

      <div className={classes.root}> {/* Envolve toda página */}

        <Typography variant="h3">Página inicial: Home</Typography>

        <Link to="/login" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Ir para Login
          </Button>
        </Link>

        <Link to="/definicaosenha" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Ir para Redefinição de Senha
          </Button>
        </Link>

        <Link to="/dashboard" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Ir para Dashboard
          </Button>
        </Link>
      </div>
    </React.Fragment>
  );
}
