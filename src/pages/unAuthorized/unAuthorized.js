import React from "react";
import "./styleText.css";
import LottieControl from "./Animation";
import { Link } from "react-router-dom";

export default function unAuthorized() {
  return (
    <>
      <LottieControl />
      
      <div className="boxSize">
        <h1> 401 </h1>
        <h3> Você não tem acesso a essa página. </h3>
      </div>

      <div className="back">
        <Link style={{ color: 'blue', fontSize: '1.2rem' }} to="/Login"> Voltar para a tela de Login </Link>
      </div>
    </>
  );
}
