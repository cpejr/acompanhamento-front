import React, { useState } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import Dashboard from '../../pages/Dashboard/dashboard';
import Testes from '../../pages/Testes';
import CadastroUsuario from '../../pages/CadastroUsuario';
import CadastroEquipamento from '../../pages/CadastroEquipamento';

import Menu from './Menu'

import DATA from '../../services/data'

import { useStyles } from './mainstyles'

import { clientTemp } from '../../services/temp'

function Main() {
  const [user] = useState(clientTemp.client);

  const isClient = user.tipo === "cliente";

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Menu user={user.name} isClient={isClient} />
      <div className={classes.spaceContent}>
        <Switch>
          <Route path="/app/dashboard">
            <Dashboard isClient={isClient} data={DATA} />
          </Route>
          <Route path="/app/testes" component={Testes} />
          <Route path="/app/cadastrousuario" component={CadastroUsuario} />
          <Route path="/app/cadastroequipamento" component={CadastroEquipamento} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(Main);
