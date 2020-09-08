import React, { createContext, useState } from 'react';
import CreatePeople from '../services/people';
import api from '../services/api';

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const id = "8b1e92f0-f1db-11ea-993d-dbb50037214a"
  const [user, setUser] = useState(CreatePeople.people[3]);

  api.get(`/client/${id}`)
    .then(data => setUser(data.data.client))
    .catch(err => console.error(err));

  const isClient = user.funcao === "Cliente";

  return (
    <AuthContext.Provider value={{ user, isClient }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContextProvider, AuthContext };
