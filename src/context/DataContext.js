import React, { createContext, useState, useEffect } from 'react';
import { Backdrop, makeStyles, CircularProgress } from '@material-ui/core'
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
  const [equipmentsList, setEquipmentsList] = useState([{}]);
  const [modelsList, setModelsList] = useState([{}]);
  const [clientsList, setClientsList] = useState([{}]);

  // get equipments
  useEffect(() => {
    (async () => {
      await backend.getEquipments()
        .then(data => {
          const equipments = data.equipment
          setEquipmentsList(equipments);
        })
    }
    )();
  }, [])

  // get models
  useEffect(() => {
    (async () => {
      await backend.getModels()
        .then(data => {
          const models = data.data
          setModelsList(models);
        })
    }
    )();
  }, [])

  // get clients
  useEffect(() => {
    (async () => {
      await backend.getClients()
        .then(data => {
          const clients = data.client
          setClientsList(clients);
        })
    }
    )();
  }, [])

  useEffect(() => {
    if (equipmentsList[0].client)
      setLoading(false);
    else if (modelsList[0].modelName)
      setLoading(false);
    else if (clientsList[0].name)
      setLoading(false);
    else setLoading(true);
  }, [clientsList, equipmentsList, modelsList])

  if (loading) { //pagina de carregamento
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  return (
    <DataContext.Provider value={{
      clientsList,
      equipmentsList,
      modelsList,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContextProvider, DataContext };
