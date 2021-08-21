import React, { Fragment } from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import history from "./history";

import { LoginContextProvider } from "./context/LoginContext";

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
import AtualizacaoEquipamento from "./pages/AtualizacaoEquipamento";
import AtualizacaoModelo from "./pages/AtualizacaoModelo";
import FuncionamentoEquipamento from "./pages/FuncionamentoEquipamento";
import EsqueciSenha from "./pages/EsqueciSenha";
import DefinicaoNovaSenha from "./pages/DefinicaoNovaSenha";
import ErroDePermissao from "./pages/ErroDePermissao";
import RoutesPrivate from "./components/Routes/Private/Private";
import Perfil from "./pages/Perfil/Perfil";
import Manutencao from "./pages/Manutencao/manutencao";
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
          <Route path="/erroPermissao" component={ErroDePermissao} />
          <Fragment>
            <Menu />

            <div className={classes.spaceContent}>

              {/* DashBoard */}
              <RoutesPrivate
                path="/dashboard"
                component={Dashboard}
              />

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
              <RoutesPrivate
                path="/au/:id"
                component={Perfil}
              />

              {/* Atualização de Modelo */}
              <RoutesPrivate path="/am" exact>
                <Redirect to="/" />
              </RoutesPrivate>
              <RoutesPrivate
                path="/am/:id"
                component={AtualizacaoModelo}
              />

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

              {/* Pagina para inserir texto de manutenção do equipmanento */}
              <RoutesPrivate
                path="/manutencao/:id"
                component={Manutencao}
              />

            </div>
          </Fragment>
        </Switch>
      </LoginContextProvider>
    </Router >
  );
}

export default Routes;
