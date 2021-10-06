import React, { useRef, useState, useEffect, useContext } from "react";
import {
  TextField,
  Grid,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import api from "../../services/api";
import { useStyles } from "./cadastroUsuarioStyle";
import { AuthContext } from "../../context/AuthContext";
import { LoginContext } from '../../context/LoginContext';

function CadastroPJ(props) {
  const {
    formData,
    handleChangeInput,
    mode,
    type,
  } = props;

  const classes = useStyles();
  const buttonRef = useRef(null);
  const { sendMessage } = useContext(AuthContext);
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();

  // states
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [corporate_name, setCorporateName] = useState("");
  const [state_registration, setStateRegistration] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  // seta os valores quando os dados chegarem
  useEffect(() => {
    if (formData) {
      setName(formData.name);
      setCnpj(formData.cnpj);
      setEmail(formData.email);
      setPhonenumber(formData.phonenumber);
      setEmailConfirm(formData.emailConfirm);
      setCorporateName(formData.corporate_name);
      setStateRegistration(formData.state_registration);
    }

  }, [formData]);

  function handleInput(event, type) {
    let str = event.target.value;

    switch (type) {
      case "name":
        setName(event.target.value);
        break;

      case "cnpj":
        event.target.value = str.replace(/\D/g, ""); // somente numeros
        setCnpj(event.target.value);
        break;

      case "phonenumber":
        event.target.value = str.replace(/[^0-9() ]/g, ""); // somente telefone
        setPhonenumber(event.target.value);
        break;

      case "corporate_name":
        setCorporateName(event.target.value);
        break;

      case "state_registration":
        setStateRegistration(event.target.value);
        break;

      case "email":
        setEmail(event.target.value);
        break;

      case "emailConfirm":
        setEmailConfirm(event.target.value);
        break;

      case "password":
        setSenha(event.target.value);
        break;

      case "passwordConfirm":
        setSenhaConfirm(event.target.value);
        break;

      default:
        break;
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
  }

  function validateAllFields(data) {

    const passwordSize = data.password
      ? data.password.length
      : 0;

    const phonenumberSize = data.phonenumber
      ? data.phonenumber.length
      : 0;

    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cnpj !== "" && data.cnpj.length === 14 &&
      data.email !== "" && data.email.includes("@") && data.email.includes(".com") &&
      data.phonenumber !== "" && passwordSize >= 8 &&
      data.password !== "" && phonenumberSize >= 8 &&
      email === emailConfirm &&
      senha === senhaConfirm
    ) return true;

    else return false;
  }

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      type: type,
      name: name,
      cnpj: cnpj,
      email: email,
      phonenumber: phonenumber,
      password: senha,
      corporate_name: corporate_name,
      state_registration: state_registration,
      birthdate: "00/00/0000", // gambiarra
    };

    if (validateAllFields(data)) {

      if (email !== emailConfirm) {
        sendMessage("Os emails estão diferentes.", "error")
        return;
      }
      if (senha !== senhaConfirm) {
        sendMessage("As senhas não batem.", "error");
        return;
      }

      sendMessage("Realizando cadastro...", "info", null);

      await api
        .post("user/create", data, {headers: {authorization: `Bearer ${accessToken}`}})
        .then((response) => {
          sendMessage("Cadastrado com sucesso");
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            sendMessage("Error 501: Falha no cadastro", "error");
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            sendMessage("Error 501: Falha no cadastro", "error");
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
            sendMessage("Error 501: Falha no cadastro", "error");
          }

          if (error.response.status === 400) {
            sendMessage(`Erro: ${error.response.data.notification}`, 'error');
          } else sendMessage("Erro desconhecido ao fazer o cadastro!", 'error');
        });

    } else { // mensagens (snackbar) de erros

      if (email !== emailConfirm) sendMessage("Os emails estão diferentes.", "error");
      else if (senha !== senhaConfirm) sendMessage("As senhas estão diferentes.", "error");
      else if (data.password.length < 8) sendMessage("Senha deve ter no mínimo 8 caracteres!", "error");
      else if (data.email === "" || !data.email.includes("@") || !data.email.includes(".com"))
        sendMessage("Email inválido!", "error");
      else if (data.cnpj.length < 14) sendMessage("CNPJ inválido.", "error");
      else if (data.phonenumber.length < 8) sendMessage("Telefone inválido.", "error");

      else sendMessage('Campos com dados inválidos!', 'error');
    };
  }

  return (
    <div>
      <form onSubmit={(e) => handleRegister(e)}>
        <Grid container spacing={useMediaQuery("(min-width:960px)") ? 5 : 0}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              className={classes.inputForm}
              value={name}
              label="Nome da Empresa"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, "name")}
              disabled={mode === "view" || mode === "updatepassword"}
              required
            />

            <TextField
              name="cnpj"
              className={classes.inputForm}
              value={cnpj}
              label="CNPJ"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 14 }}
              onChange={(e) => handleInput(e, "cnpj")}
              disabled={mode !== "create"}
              required
            />

            <TextField
              name="phonenumber"
              className={classes.inputForm}
              value={phonenumber}
              label="Número de telefone"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 15 }}
              onChange={(e) => handleInput(e, "phonenumber")}
              disabled={mode === "view" || mode === "updatepassword"}
              required
            />
            
            <TextField
              name="corporate_name"
              className={classes.inputForm}
              value={formData.corporate_name}
              label="Razão Social"
              type="corporate_name"
              helperText="Opcional"
              variant="filled"
              disabled={mode === "view" || mode === "updatepassword"}
              onChange={(e) => handleInput(e, "corporate_name")}
              optional
            />

            <TextField
              name="state_registration"
              className={classes.inputForm}
              value={formData.state_registration}
              label="Inscrição Estadual"
              type="state_registration"
              helperText="Opcional"
              variant="filled"
              disabled={mode === "view" || mode === "updatepassword"}
              onChange={(e) => handleInput(e, "state_registration")}
              optional
            />

          </Grid>

          <Grid item xs={12} md={6}>
            {(mode === "create" || mode === "updatepassword") && (
              <>
                <TextField
                  name="email"
                  className={classes.inputForm}
                  value={email}
                  label="Endereço de e-mail"
                  type="email"
                  helperText="*Obrigatório"
                  variant="filled"
                  disabled={mode === "view"}
                  onChange={(e) => handleInput(e, "email")}
                  required
                />

                <TextField
                  name="emailConfirm"
                  className={classes.inputForm}
                  value={emailConfirm}
                  label="Confirmar e-mail"
                  type="email"
                  helperText="*Obrigatório"
                  variant="filled"
                  disabled={mode === "view"}
                  onChange={(e) => handleInput(e, "emailConfirm")}
                  required
                />
                
                <TextField
                  name="password"
                  autoComplete="off"
                  className={classes.inputForm}
                  value={senha}
                  label="Criar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  inputProps={{ minLength: 8 }}
                  disabled={mode === "view"}
                  onChange={(e) => handleInput(e, "password")}
                  required
                />

                <TextField
                  name="passwordConfirm"
                  autoComplete="off"
                  className={classes.inputForm}
                  value={senhaConfirm}
                  label="Confirmar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  inputProps={{ minLength: 8 }}
                  disabled={mode === "view"}
                  onChange={(e) => handleInput(e, "passwordConfirm")}
                  required
                />
              </>
            )}
          </Grid>

          {mode === "create" && (
            <div className={classes.buttonContainer}>
              <Button
                type="submit"
                ref={buttonRef}
                className={classes.buttonRegister}
              >
                Cadastrar
              </Button>
            </div>
          )}
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;
