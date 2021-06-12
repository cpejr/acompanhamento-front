import React, { Fragment } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import history from "./history";

import { DataContextProvider } from "./context/DataContext";
import LoginContextProvider from "./context/LoginContext";

// import Home from './pages/Home'
import Login from "./pages/Login";
import Menu from "./components/Menu";
import Dashboard from "./pages/Dashboard/dashboard";
import CadastroUsuario from "./pages/CadastroUsuario";
import CadastroModelo from "./pages/CadastroModelo";
import CadastroEquipamento from "./pages/CadastroEquipamento";
import ListagemUsuario from "./pages/ListagemUsuario";
import ListagemModelo from "./pages/ListagemModelo";
import ListagemEquipamento from "./pages/ListagemEquipamento";
import AtualizacaoUsuario from "./pages/AtualizacaoUsuario";
import AtualizacaoEquipamento from "./pages/AtualizacaoEquipamento";
import AtualizacaoModelo from "./pages/AtualizacaoModelo";
import FuncionamentoEquipamento from "./pages/FuncionamentoEquipamento";
import Testes from "./pages/Testes";
import EsqueciSenha from "./pages/EsqueciSenha";
import DefinicaoNovaSenha from "./pages/DefinicaoNovaSenha";
import RoutesPrivate from "./components/Routes/Private/Private";
import Perfil from "./pages/Perfil/Perfil";

import { useStyles } from "./routesStyles";

function Routes() {
  const classes = useStyles();

  return (
    <Router history={history}>
      <LoginContextProvider>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/esquecisenha" component={EsqueciSenha} />
          <Route path="/definicaosenha" component={DefinicaoNovaSenha} />
          <Fragment>
            <Menu />
            <div className={classes.spaceContent}>
              <DataContextProvider>
                {/* DashBoard */}
                <RoutesPrivate path="/dashboard" component={Dashboard} />

                {/* Listagem de Usuários via Dashboard
                <Route path="/listagemdashboard/:situacao" component={ListagemDashboard} /> */}

                {/* Cadastro de Modelo */}
                <RoutesPrivate
                  path="/cadastromodelo"
                  component={CadastroModelo}
                />

                {/* Cadastro de Equipamento */}
                <RoutesPrivate
                  path="/cadastroequipamento"
                  component={CadastroEquipamento}
                />

                {/* Cadastro de Usuários */}
                <RoutesPrivate
                  path="/cadastrousuario"
                  component={CadastroUsuario}
                />

                {/* Listagem de Usuários */}
                <RoutesPrivate
                  path="/listagemusuario"
                  component={ListagemUsuario}
                />

                {/* Listagem de Modelo */}
                <RoutesPrivate
                  path="/listagemmodelo"
                  component={ListagemModelo}
                />

                {/* Listagem de Equipamentos */}
                <RoutesPrivate
                  path="/listagemequipamento"
                  component={ListagemEquipamento}
                />

                {/* Atualização de Usuários */}
                <RoutesPrivate path="/au" exact>
                  <Redirect to="/" />
                </RoutesPrivate>
                <RoutesPrivate path="/au/:id" component={Perfil} />

                {/* Atualização de Modelo */}
                <RoutesPrivate path="/am" exact>
                  <Redirect to="/" />
                </RoutesPrivate>
                <RoutesPrivate path="/am/:id" component={AtualizacaoModelo} />

                {/* Atualização de Equipamentos */}
                <RoutesPrivate path="/ae" exact>
                  <Redirect to="/" />
                </RoutesPrivate>
                <RoutesPrivate
                  path="/ae/:id"
                  component={AtualizacaoEquipamento}
                />

                {/* Funcionamento de Equipamentos */}
                <RoutesPrivate path="/funcionamentoequipamento" exact>
                  <Redirect to="/" />
                </RoutesPrivate>
                <RoutesPrivate
                  path="/funcionamentoequipamento/:id"
                  component={FuncionamentoEquipamento}
                />

                {/* Páginas para Testes */}
                <RoutesPrivate path="/testes" component={Testes} />

                {/* <RoutesPrivate path="/" component={Login} /> */}
              </DataContextProvider>
            </div>
          </Fragment>
        </Switch>
      </LoginContextProvider>
    </Router>
  );
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
