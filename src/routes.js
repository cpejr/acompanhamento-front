
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'

function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={Login} path='/login' exact />
      {/* <Route component={componenteCarregado} path='/suaPagina' /> */}
    </BrowserRouter>
  )
}

export default Routes;
