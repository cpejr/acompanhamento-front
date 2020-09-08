import React from 'react';

import Routes from './routes';
import { AuthContextProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <Routes />
    </AuthContextProvider>
  );
}
