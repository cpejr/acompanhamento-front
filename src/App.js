import React, { useState } from 'react';

import Routes from './routes';

import DATA from './services/data';
import { clientTemp } from './services/temp';

export default function App() {
  const [user] = useState(clientTemp.client);

  const isClient = user.tipo === "cliente";

  function nextInput(event, relacionamentosRef) {
    var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
    if (keyCode === 13) {

      var e = window.event;
      e.cancelBubble = true;
      e.returnValue = false;

      if (e.stopPropagation) {
        e.stopPropagation();
        e.preventDefault();
      }

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
