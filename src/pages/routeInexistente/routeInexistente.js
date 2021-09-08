import React, { useState, useContext, useEffect } from "react";
import "././styleText.css";
import LottieControl from "./Animation";
import { Link } from "react-router-dom";
import { LoginContext } from '../../context/LoginContext';


  export default function RouteInexistente() {

    const { getToken } = useContext(LoginContext);
    const accessToken = getToken();
    const [rout, setRout] = useState(" ");
    
    // verificação se usuário está logado ou não, e defini a rota
    useEffect(()=>{
      if(accessToken){ // se não undefined em token ...
        setRout("/dashboard"); 
      }else{
        setRout("/login");
      }    
    },[accessToken]);
    
    
    return (
    <div>
      <LottieControl />
      
      <div className="boxSize">
        <h1> 404 </h1>
        <h3> Página não encontrada. </h3>
      </div>

      <div className="back">
        <Link style={{ color: 'blue', fontSize: '1.2rem' }} to={rout}> Voltar para a página válida </Link>
      </div>
    </div>
  );
}
