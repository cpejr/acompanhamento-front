import React, { Fragment } from 'react';
import { Route, Router, Switch, Redirect } from 'react-router-dom'
import history from './history';

import { DataContextProvider } from './context/DataContext';

import Home from './pages/Home'
import Login from './pages/Login'
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard/dashboard';
import CadastroUsuario from './pages/CadastroUsuario';
import CadastroEquipamento from './pages/CadastroEquipamento';
import ListagemUsuario from './pages/ListagemUsuario';
import ListagemEquipamento from './pages/ListagemEquipamento';
import AtualizacaoUsuario from './pages/AtualizacaoUsuario';
import Testes from './pages/Testes';
import ListagemDashboard from './pages/ListagemDashboard';
import EsqueciSenha from './pages/EsqueciSenha';

import { useStyles } from './routesStyles';

function Routes() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <Switch>
        <Route component={Home} exact path='/' />
        <Route path="/login" component={Login} />
        <Route path="/esquecisenha" component={EsqueciSenha} />
        <Fragment>
          <Menu />
          <div className={classes.spaceContent}>
            <DataContextProvider>
              {/* DashBoard */}
              <Route path="/dashboard">
                <Dashboard />
              </Route>

              {/* Listagem de Usuários via Dashboard */}
              <Route path="/listagemdashboard/:situacao" component={ListagemDashboard} />

              {/* Cadastro de Equipamentos */}
              <Route path="/cadastroequipamento" component={CadastroEquipamento} />

              {/* Cadastro de Usuários */}
              <Route path="/cadastrousuario" component={CadastroUsuario} />

              {/* Listagem de Usuários */}
              <Route path="/listagemusuario">
                <ListagemUsuario />
              </Route>

              {/* Listagem de Equipamentos */}
              <Route path="/listagemequipamento">
                <ListagemEquipamento />
              </Route>

              {/* Atualização de Usuários */}
              <Route path="/au" exact><Redirect to="/" /></Route>
              <Route path="/au/:id">
                <AtualizacaoUsuario />
              </Route>

              {/* Páginas para Testes */}
              <Route path="/testes" component={Testes} />
            </DataContextProvider>
          </div>
        </Fragment>
      </Switch>
    </Router>
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


