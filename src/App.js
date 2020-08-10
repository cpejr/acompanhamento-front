import React, { useState } from 'react';

import Routes from './routes';

import DATA from './services/data';
import { clientTemp } from './services/temp';

export default function App() {
  const [user] = useState(clientTemp.client);

  const isClient = user.tipo === "cliente";

  function nextInput(event, relacionamentosRef) {
    // Aqui tiro a função de submit do Enter
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode === 13) {

      var e = window.event;
      e.cancelBubble = true;
      e.returnValue = false;

      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }

      // Aqui atribuo a função do Enter
      relacionamentosRef.find(referencia =>
        (referencia.name === event.target.name)).ref.current.focus();
    }
  }

  return (
    <Routes
      isClient={isClient}
      user={user}
      data={DATA}
      nextInput={nextInput} />
  );
}

// Tentei centralizar a coleta de dados do servidor aqui no App.js, 
// todos dados coletados são passados por props e em alguns caso 
// já são tratados aqui msm

// Aqui tbm se encontra a função nextInput, ela é responsavel por fazer o Enter 
// mudar o foco de um input para outro
// Mas para isso ela necessita de um array com o relacionamento entre o nome 
// do input (name) e para qual input ele irá (ref), nesse ultimo é preciso 
// criar antes uma espécie de ponteiro em C que aponta para o referente input
// ==> Para isso use o useRef do React
