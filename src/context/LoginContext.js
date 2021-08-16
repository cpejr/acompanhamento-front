import React, { createContext } from "react";
import api from "../services/api";
import jwt from "jsonwebtoken";

export const LoginContext = createContext();

export const LoginContextProvider = (props) => {
  function signIn(accessToken) {
    localStorage.setItem("token", accessToken);
    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  }

  function logOut() {
    localStorage.removeItem("token");
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  async function getUser() {
    const token = localStorage.getItem("token");

    const userAux = jwt.verify(
      token,
      process.env.REACT_APP_ACCESS_TOKEN_SECRET,
      (err, data) => {
        if (err) return err;
        return data;
      }
    );
    // const response = await api.get(`/user/${userData.id}`);
    // console.log(userAux.userData, "userData");
    // return response.data.user;
    return userAux.userData;
  }

  function getUserId() {
    const token = localStorage.getItem("token");
    const userAux = 
      jwt.verify(token, process.env.REACT_APP_ACCESS_TOKEN_SECRET, (err, data) => {
        if (err) return err;
        return data;
    });
    // console.log(userAux, "userAux");
    return userAux.userData.id;
  }

  return (
    <LoginContext.Provider value={{ signIn, logOut, getUser, getUserId, getToken }}>
      {props.children}
    </LoginContext.Provider>
  );
};
