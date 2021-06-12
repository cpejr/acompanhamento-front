import React, { useContext } from "react";
import AtualizacaoUsuario from "../AtualizacaoUsuario/atualizacaoUsuario";
import {LoginContext} from "../../context/LoginContext";

function Perfil() {
  const { user } = useContext(LoginContext);
  return (
    <div>
      <AtualizacaoUsuario userPerfil={user} perfil={false} />
    </div>
  );
}

export default Perfil;
