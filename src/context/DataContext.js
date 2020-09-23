import React, { createContext, useState, useEffect } from 'react';
import { Backdrop, makeStyles, CircularProgress } from '@material-ui/core'
import CreatePeople from '../services/people';
import backend from '../services/backend';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const DataContext = createContext();

function DataContextProvider({ children }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [usersList] = useState(CreatePeople.people);
  const [equipmentsList, setEquipmentsList] = useState([{}]);

  useEffect(() => {
    (async () => {
      await backend.getEquipments()
        .then(data => {
          const equipments = data.equipment
          setTimeout(() => {
            setEquipmentsList(equipments);
          }, 700);
        })
    }
    )();
  }, [])

  useEffect(() => {
    if (equipmentsList[0].client)
      setLoading(false);
    else setLoading(true);
  }, [equipmentsList])

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
