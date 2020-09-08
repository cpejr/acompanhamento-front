import React from 'react';
import history from '../../history';

export default function Testes() {
  function mudarUrl() {
    history.push('dashboard');
  }
  return (
    <button onClick={mudarUrl}>Vai para a dashboard</button>
  );
}
