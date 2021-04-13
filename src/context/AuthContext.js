import React, { createContext, useState, useEffect } from 'react';
import CreatePeople from '../services/people';
import api from '../services/api';
import { Backdrop, CircularProgress, makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const AuthContext = createContext();

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function AuthContextProvider({ children }) {
  const classes = useStyles();
  const id = "8b1e92f0-f1db-11ea-993d-dbb50037214a"
  const [user, setUser] = useState(CreatePeople.people[3]);
  const [loading, setLoading] = useState(true);
  const [openMensage, setOpenMensage] = React.useState({
    open: false, message: 'Cadastrado com sucesso', type: 'success', time: 5000
  });

  useEffect(() => {
    api.get(`/client/${id}`)
      .then(data => setUser(data.data.client))
      .catch(err => console.error("Liga o backend ai mano", err));
    setLoading(false);
  }, []);

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(prev => ({ ...prev, open: false }));
  }

  const sendMessage = (message = "", type = "success", time = 5000) => {
    setOpenMensage(prev => ({ ...prev, open: true, message, type, time }));
  }

  const isClient = user.role === "Cliente";

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  return (
    <AuthContext.Provider value={{ user, isClient, sendMessage }}>

      {children}

      <Snackbar autoHideDuration={openMensage.time} open={openMensage.open} onClose={handleCloseMensage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert elevation={6} variant="filled" severity={openMensage.type}>
          {openMensage.message}
        </Alert>
      </Snackbar>
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
