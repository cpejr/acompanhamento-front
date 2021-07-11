import React, { createContext } from "react";

export const LoginContext = createContext();
export const LoginContextProvider = (props) => {

  function signIn(token, user) {
    const existsToken = localStorage.getItem("accessToken");

    if (existsToken) {
      localStorage.removeItem("accessToken");
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("user", JSON.stringify(user[0]));
  }

  function logOut() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
  }

  function getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  function getToken() {
    return localStorage.getItem("accessToken")
  }

  return (
    <LoginContext.Provider
      value={{ signIn, logOut, getUser, getToken }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};
