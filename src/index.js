import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/**
 * pasta /components: items que são repetidos varias vezes, como butões estilizados
 *    inputs, topbar, etc
 *
 * pasta /pages: as páginas em si, o que será renderizado no Route component{}
 *
 * pasta /services:  arquivos de configurações para comunicação com APIs e com o
 *    próprio backend
 *
 */
