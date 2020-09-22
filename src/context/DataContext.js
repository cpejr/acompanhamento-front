import React, { createContext, useState } from 'react';
import { Backdrop, makeStyles, CircularProgress } from '@material-ui/core'
import CreatePeople from '../services/people';
import DATA from '../services/data';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const DataContext = createContext();

function DataContextProvider({ children }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [usersList] = useState(CreatePeople.people);
  const [equipmentsList] = useState(DATA);

  if (loading) { //pagina de carregamento
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <DataContext.Provider value={{ usersList, equipmentsList }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContextProvider, DataContext };
