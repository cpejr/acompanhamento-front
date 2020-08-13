import React, { useState } from 'react';

import Routes from './routes';

import DATA from './services/data';
import CreatePeople from "./services/people";

export default function App() {
  const [usersList] = useState(CreatePeople.people);

  const isClient = usersList[0].tipo === "cliente";

  return (
    <Routes
      isClient={isClient}
      user={usersList[0]}
      data={DATA}
      usersList={usersList} />
  );
}

// Tentei centralizar a coleta de dados do servidor aqui no App.js, 
// todos dados coletados são passados por props e em alguns caso 
// já são tratados aqui msm
