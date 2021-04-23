import ClipLoader from "react-spinners/ClipLoader";
import React, { createContext, useState, useEffect } from "react";
import useStorage from '../utils/useStorage';
import api from "../services/api";

export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [token, setToken] = useStorage('token');
  const [user, setUser] = useState();

  async function verify(token) {
    try {
      const response = await api.get("/verify");
      const data = response.data;

      if (data.verified) {
        setToken(token);
        setUser(data.user[0]);
      } else {
        setToken(null);
        setUser(null);
        localStorage.removeItem("accessToken");
      }
    } catch (err) {
      console.warn(err);
    }
  }

  useEffect(async () => {

    const currentToken = localStorage.getItem("accessToken");

    if (currentToken && currentToken !== " ") {
      await verify(currentToken);
    }
    console.log("UseEffect LoginContext");
  }, []);

  function signIn(token, user) {
    const existsToken = localStorage.getItem("accessToken");

    if (existsToken) {
      localStorage.removeItem("accessToken");
    }

    localStorage.setItem("accessToken", token);
    setUser(user[0]);
    setToken(token);
  }

  function logOut() {
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  }

  return (
    <LoginContext.Provider
      value={{ token, user, signIn, logOut, setUser, verify }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
