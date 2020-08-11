import React, { useState } from 'react';

import Routes from './routes';

import DATA from './services/data';
import { clientTemp } from './services/temp';

export default function App() {
  const [user] = useState(clientTemp.client);

  const isClient = user.tipo === "cliente";

  return (
    <Routes
      isClient={isClient}
      user={user}
      data={DATA} />
  );
}

// Tentei centralizar a coleta de dados do servidor aqui no App.js, 
// todos dados coletados são passados por props e em alguns caso 
// já são tratados aqui msm
