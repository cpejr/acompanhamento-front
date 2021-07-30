import React, { useRef, useState, useEffect, useContext } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  useMediaQuery,
} from "@material-ui/core";
import api from "../../services/api";
import { useStyles } from "./cadastroUsuarioStyle";
import nextInput from "../../services/nextInput";
import { AuthContext } from "../../context/AuthContext";

function CadastroPJ(props) {
  const {
    handleChangeCheck,
    handleSubmit,
    formData,
    handleChangeInput,
    mode,
    type,
  } = props;

  const classes = useStyles();
  const buttonRef = useRef(null);
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  // const [address, setAddress] = useState("");
  // const [zipcode, setZipcode] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const { sendMessage } = useContext(AuthContext);

  // seta os valores quando os dados chegarem
  useEffect(() => {
    setName(formData.name);
    setCnpj(formData.cnpj);
    setEmail(formData.email);
    setPhonenumber(formData.phonenumber);
    // setAddress(formData.address);
    // setZipcode(formData.zipcode);
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

      // case "address":
      //   setAddress(event.target.value);
      //   break;

      // case "zipcode":
      //   setZipcode(event.target.value);
      //   break;

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
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
  }

  function validateAllFields(data) {

    if (
      data.type  !== "" &&
      data.name  !== "" &&
      data.cnpj   !== "" && data.cnpj.length === 14 &&
      data.email !== "" && data.email.includes("@") && data.email.includes(".com") &&
      data.phonenumber !== "" && data.phonenumber.length >= 8 && 
      data.password    !== "" && data.password.length >= 8 &&
      data.address     !== "" &&
      data.zipcode     !== "" && data.zipcode.length >= 8 &&
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
      // address: address,
      // zipcode: zipcode,
      birthdate: "00/00/0000", // gambiarra
    };
    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cnpj !== "" &&
      data.email !== "" &&
      data.phonenumber !== "" &&
      data.password !== "" 
      // data.address !== "" 
      // data.zipcode !== ""
    ) {
      if (email !== emailConfirm){
      alert("Os emails estão diferentes.");
      return;
      }
      if (senha !== senhaConfirm){
      alert("As senhas não batem.");
      return;
      }

      sendMessage("Realizando cadastro...", "info", null);
      api
        .post("user/create", data)
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
      if      (email !== emailConfirm) sendMessage("Os emails estão diferentes.", "error");
      else if (senha !== senhaConfirm) sendMessage("As senhas estão diferentes.", "error");
      else if (data.password.length < 8) sendMessage("Senha deve ter no mínimo 8 caracteres!", "error");
      else if (data.email === "" || !data.email.includes("@") || !data.email.includes(".com")) 
        sendMessage("Email inválido!", "error");
      else if (data.cnpj.length < 14) sendMessage("CNPJ inválido.", "error");
      else if (data.zipcode.length < 8) sendMessage("CEP inválido.", "error");
      else if (data.phonenumber.length < 8) sendMessage("Telefone inválido.", "error");

      else sendMessage('Campos com dados inválidos!', 'error');
    };
  }

  return (
    <div>
      <form onSubmit={(e) => handleRegister(e)}>
        <Grid container spacing={useMediaQuery("(min-width:960px)") ? 5 : 0}>
          <Grid item xs={12}>
            <TextField
              name="name"
              className={classes.inputForm}
              value={name}
              label="Nome Completo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, "name")}
              disabled={mode === "view"}
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
              disabled={mode === "view"}
              required
            />
            <TextField
              name="email"
              className={classes.inputForm}
              value={formData.email}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              disabled={mode !== "create"}
              onChange={(e) => handleInput(e, "email")}
              required
            />
            {mode === "create" && (
              <>
                <TextField
                  name="emailConfirmar"
                  className={classes.inputForm}
                  value={formData.emailConfirmar}
                  label="Confirmar e-mail"
                  type="email"
                  helperText="*Obrigatório"
                  variant="filled"
                  onChange={(e) => setEmailConfirm(e.target.value)}
                  required
                />

                <TextField
                  name="senha"
                  autoComplete="off"
                  className={classes.inputForm}
                  value={formData.senha}
                  label="Criar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  inputProps={{ minLength: 8 }}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />

                <TextField
                  name="senhaConfirmar"
                  autoComplete="off"
                  className={classes.inputForm}
                  value={formData.senhaConfirmar}
                  label="Confirmar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  inputProps={{ minLength: 8 }}
                  onChange={(e) => setSenhaConfirm(e.target.value)}
                  required
                />
              </>
            )}
        
            {/* <TextField
              name="address"
              className={classes.inputForm}
              value={address}
              label="Endereço"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, "address")}
              disabled={mode === "view"}
              required
            /> */}

            {/* <TextField
              name="zipcode"
              className={classes.inputForm}
              value={zipcode}
              label="CEP"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 8 }}
              onChange={(e) => handleInput(e, "zipcode")}
              disabled={mode === "view"}
              required
            /> */}
          </Grid>
          
          <Grid item xs={12}>
            {mode === "create" && (
              <Grid item xs={12}>
                <Button
                  type="submit"
                  ref={buttonRef}
                  className={classes.buttonRegister}
                >
                  Cadastrar
                </Button>
              </Grid>
            )}
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;
