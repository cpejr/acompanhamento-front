
import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login/login'
import Dashboard from './pages/Dashboard'

function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} exact path='/' />
      <Route component={Login} exact path='/login' />
      <Route component={Dashboard} exact path='/dashboard' />
    </BrowserRouter>
  )
}

export default Routes;

/**
 * O react se baseia em aplicações singles pages, o que significa q teremos
 * um unico arquivo html e este terá seu conteudo trocado de acordo com nossa
 * vontade. Para simular nossas páginas portanto precisamos definilas usando o
 * react-router-dom, onde em seu componente Route colocamos sua URL relativa e
 * o componente a ser renderizado. Ex.:
 *
 * <Route component={componenteCarregado} path='/URLrelativa' />
 */

/**
 * Para transitar entre suas páginas do site recomendace usar o
 *    <Link to="mypage"></Link>
 * ao invés do
 *    <a href="mypage"></a>
 * Este é mais rápido pois não precisará recarregar a página inteira
 */


