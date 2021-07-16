import React, { createContext } from "react";
import api from "../services/api";

export const LoginContext = createContext();
export const LoginContextProvider = (props) => {

  function signIn(user) {
    localStorage.setItem("userId", user[0].id);
  }

  function logOut() {
    localStorage.removeItem("userId");
  }

  async function getUser() {
    const userId = localStorage.getItem("userId");

    const response = await api.get(`/user/${userId}`);

    return response.data.user;
  }

  function getUserId() {
    return localStorage.getItem("userId");
  }

  return (
    <LoginContext.Provider
      value={{ signIn, logOut, getUser, getUserId }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
