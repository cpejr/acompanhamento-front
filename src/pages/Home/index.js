import React from 'react';
import { Link } from 'react-router-dom';
import {
  CssBaseline,
  Button,
  makeStyles,
  Typography
} from '@material-ui/core'
import ButtonPadrao from '../../components/ButtonPadrao';

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
    width: "552px",
    height: "73px",
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
        <ButtonPadrao text="O texto" />
      </div>
    </React.Fragment>
  );
}
