import React, { createContext } from "react";
import api from "../services/api";
import jwt from "jsonwebtoken";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  function signIn(accessToken) {
    localStorage.setItem("token", accessToken);
  }

  function logOut() {
    localStorage.removeItem("token");
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function getData() {
    const token = localStorage.getItem("token");
    const aux = jwt.verify(
      token,
      process.env.REACT_APP_ACCESS_TOKEN_SECRET,
      (err, data) => {
        if (err) return err;
        return data;
      }
    );
    return aux;
  }

  function getUser() {
    const userAux = getData();
    return userAux.userData;
  }

  function getUserId() {
    const userAux = getData();
    return userAux.userData.id;
  }

  function getUserType() {
    const userAux = getData();
    return userAux.userData.type;
  }

  function IsClient(){
    const userType = getUserType();
    if(userType === "Funcionario") return false;
    return true;
  }

  return (
    <LoginContext.Provider value={{ signIn, logOut, getUser, getUserId, getToken, getUserType, IsClient}}>
      {props.children}
    </LoginContext.Provider>
  );
};
