import { useContext } from 'react';
import DataContext from '../context/DataContext';

export default function validatorForAxios(error) {
  const { sendMessage } = useContext(DataContext);
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
    setOpenMensage(({ open: true, message: "Error 501: Falha no cadastro", type: 'error', time: 5000 }));
  }
  setOpenMensage(({ open: true, message: `Error 504: ${error.message}`, type: 'error', time: 5000 }));
});
}
