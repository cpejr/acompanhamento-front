import React, { useContext, useState } from "react";
import AtualizacaoUsuario from "../AtualizacaoUsuario/atualizacaoUsuario";
import { LoginContext } from "../../context/LoginContext";

function Perfil() {

  const { getUser } = useContext(LoginContext);
  const [user, setUser] = useState();

  async function getUserFromSession() {
    setUser(await getUser());
  }

  getUserFromSession();

  return (
    <div>
      { user && (
        <AtualizacaoUsuario userPerfil={ user } perfil={false} />
      )}
    </div>
  );
}

export default Perfil;
