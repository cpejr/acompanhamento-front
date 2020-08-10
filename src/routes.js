import React, { Fragment } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './components/Menu';
// import Dashboard from 'pages/Dashboard/dashboard';
import Testes from './pages/Testes';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroEquipamento from './pages/CadastroEquipamento';
import ListagemUsuario from './pages/ListagemUsuario';

import { useStyles } from './routesStyles';
import Dashboard from './pages/Dashboard/dashboard';

function Routes(props) {
  const { isClient, user, data, nextInput } = props; //Props vindas do App.js

  const classes = useStyles();

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path='/' />
        <Route path="/login" component={Login} />
        <Fragment>
          <Menu user={user.name} isClient={isClient} />
          <div className={classes.spaceContent}>
            {/* DashBoard */}
            <Route path="/dashboard">
              <Dashboard isClient={isClient} data={data} />
            </Route>

            {/* Cadastro de Equipamentos */}
            <Route path="/cadastroequipamento">
              <CadastroEquipamento nextInput={nextInput} />
            </Route>

            {/* Cadastro de Usuários */}
            <Route path="/cadastrousuario" component={CadastroUsuario} />

            {/* Listagem de Usuários */}
            <Route path="/listagemusuario" component={ListagemUsuario} />

            {/* Páginas para Testes */}
            <Route path="/testes" component={Testes} />
          </div>
        </Fragment>
      </Switch>
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


