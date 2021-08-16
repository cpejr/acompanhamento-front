import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiMail, FiLock, FiAlertTriangle } from "react-icons/fi";
import {
  TextField,
  CssBaseline,
  Typography,
  OutlinedInput,
  Button,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import api from "../../services/api";

import { useStyles } from "./styles";
import { LoginContext } from "../../context/LoginContext";
import { AuthContext } from "../../context/AuthContext";

const currentdate = new Date();

export default function Login() {

  const classes = useStyles();
  const history = useHistory();
  const { signIn } = useContext(LoginContext);
  const { sendMessage } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    user: "",
    password: "",
    showPassword: false,
  });

  const isValidEmailAndPassword = () => {

    setError("");
    const email = values.user;
    const password = values.password;

    if (
      email === "" || 
      !email.includes("@") || 
      !email.includes(".com")
    ) {
      setError("Email inválido!");
      return false;
    }

    if (password.length < 6) {
      return false;
    }
    
    return true;
  }

  async function handleSubmit(event) {

    event.preventDefault();

    // proteção e validação do front
    if (!isValidEmailAndPassword()) {
      sendMessage("Dados inválidos!", "error", 2000);
      return;
    };

    var formattedDateAndTime =
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      " - " +
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();

    try {

      sendMessage("Realizando login...", "info", null);

      const response = await api.post("/login", {
        email: values.user,
        password: values.password,
      });

      // console.log(response.data);


      if (response.data.accessToken) {
        const user = response.data.user;
        const token = response.data.accessToken;

        signIn(token);

        // atualiza a última data ativa
        await api.put(`/user/${user[0].id}`, { active: formattedDateAndTime });

        sendMessage("Login efetuado com sucesso!", "success", 1000);
        setTimeout(() => {
          history.push("/dashboard");
        }, 1000)
        
      } else {
        sendMessage("Email ou senha incorretos!", "error", 2000);
      }

    } catch (err) {
      sendMessage("Acesso negado!", "error", 2000);
      console.warn(err);
    }
  }

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <CssBaseline />{" "}
      <div className={classes.root}>
        <Link to="/" className={classes.logo}></Link>

        <div className={classes.loginBox}>
          <Typography className={classes.loginTxt}>Login</Typography>

          <form className={classes.loginForm} onSubmit={handleSubmit}>
            <h5 style={{ color: "white", margin: "0" }}>Email</h5>
            <TextField
              className={classes.input}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FiMail size={24} className={classes.icon} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              type="email"
              id="email"
              error={!!error}
              value={values.user}
              onChange={handleChange("user")}
            />
            {!!error && (
              <>
                <p className={classes.errorTextLogin}>
                  <FiAlertTriangle /> {error}
                </p>
              </>
            )}

            <h5 style={{ color: "white", margin: "0" }}>Senha</h5>
            <OutlinedInput
              className={classes.input}
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              startAdornment={
                <InputAdornment position="start">
                  <FiLock size={24} className={classes.icon} />
                </InputAdornment>
              }
              labelWidth={0}
            />

            <div style={{ marginTop: "15px" }}>
              <Link to="./esquecisenha" className={classes.forgotPassword}>
                Esqueci minha senha!
              </Link>
            </div>

            <div onClick={handleSubmit}>
              <Button
                type="submit"
                className={classes.buttonLogin}
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
