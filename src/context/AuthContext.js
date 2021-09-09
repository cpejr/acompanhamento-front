import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';
import { Backdrop, CircularProgress, makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const AuthContext = createContext();

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function AuthContextProvider({ children }) {

  const classes = useStyles();
  const id = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("token")

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [openMensage, setOpenMensage] = React.useState({
    open: false, message: 'Cadastrado com sucesso', type: 'success', time: 5000
  });

  useEffect(() => {
    api.get(`/user/${id}`, {headers: {authorization: `Bearer ${accessToken}`}})
      .then(response => setUser(response.data.user))
      .catch(err => console.error("Verifique se o backend está ligado ou se há usuário logado.", err));
    setLoading(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseMensage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenMensage(prev => ({ ...prev, open: false }));
  }

  const sendMessage = (message = "", type = "success", time = 5000) => {
    setOpenMensage(prev => ({ ...prev, open: true, message, type, time }));
  }

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
    <AuthContext.Provider value={{ user, sendMessage }}>

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
