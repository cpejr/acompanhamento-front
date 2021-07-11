import React, { useContext } from "react";
import AtualizacaoUsuario from "../AtualizacaoUsuario/atualizacaoUsuario";
import { LoginContext } from "../../context/LoginContext";

function Perfil() {
  const { getUser } = useContext(LoginContext);
  return (
    <div>
      <AtualizacaoUsuario userPerfil={ getUser() } perfil={false} />
    </div>
  );
}

export default Perfil;
