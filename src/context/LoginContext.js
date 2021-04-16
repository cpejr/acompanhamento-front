import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const LoginContext = createContext();

const LoginContextProvider = ({children}) => {

  const [token, setToken] = useState();

  return (
    <LoginContext.Provider
      value={{ token, setToken }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
