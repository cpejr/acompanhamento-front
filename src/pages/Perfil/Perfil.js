import React, { useContext, useState, useEffect } from "react";
import AtualizacaoUsuario from "../AtualizacaoUsuario/atualizacaoUsuario";
import { LoginContext } from "../../context/LoginContext";

function Perfil() {

  const { getUser } = useContext(LoginContext);
  const [user, setUser] = useState();
  

  useEffect(() => {
    async function getUserFromSession() {
      setUser(await getUser());
      const aux = getUser();
      console.log(aux, "perfil");
    }
  
    getUserFromSession();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      { user && (
        <AtualizacaoUsuario userPerfil={ user } perfil={false} />
      )}
    </div>
  );
}

export default Perfil;
