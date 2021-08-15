import React, { useRef, useState, useEffect, useContext } from "react";
import {
  TextField,
  Grid,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import api from "../../services/api";
import { useStyles } from "./cadastroUsuarioStyle";
import { AuthContext } from "../../context/AuthContext";
import isValidDate from '../../services/dateValidation';

function CadastroFuncionario(props) {

  const {
    formData,
    handleChangeInput,
    mode,
    type
  } = props;

  const classes = useStyles();

  const buttonRef = useRef(null);
  const { sendMessage } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  // seta os valores quando os dados chegarem
  useEffect(() => {

    if (formData) {
      setName(formData.name);
      setCpf(formData.cpf);
      setBirthdate(formData.birthdate);
      setEmail(formData.email);
      setPhonenumber(formData.phonenumber);
      setEmailConfirm(formData.emailConfirm);
    }
  }, [formData])

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      type: type,
      name: name,
      birthdate: birthdate,
      cpf: cpf,
      email: email,
      phonenumber: phonenumber,
      password: senha
    };
    if (validateAllFields(data)) {

      if (email !== emailConfirm){
        sendMessage("Os emails estão diferentes.", "error")
        return;
      }
      if (senha !== senhaConfirm){
        sendMessage("As senhas não batem.", "error");
        return ; 
      }

      sendMessage('Realizando cadastro...', 'info', null);
      api
        .post("/user/create", data)
        .then((response) => {
          sendMessage('Cadastrado com sucesso');
        })
        .catch((error) => {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            sendMessage('Error 501: Falha no cadastro', 'error');
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
            sendMessage('Error 501: Falha no cadastro', 'error');
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            sendMessage('Error 501: Falha no cadastro', 'error');
          }

          if (error.response.status === 400) {
            sendMessage(`Erro: ${error.response.data.notification}`, 'error');
          } else sendMessage("Erro desconhecido ao fazer o cadastro!", 'error');
        })

    } else { // mensagens (snackbar) de erros

      if (email !== emailConfirm) sendMessage("Os emails estão diferentes.", "error");
      else if (senha !== senhaConfirm) sendMessage("As senhas estão diferentes.", "error");
      else if (data.password.length < 8) sendMessage("Senha deve ter no mínimo 8 caracteres!", "error");
      else if (data.email === "" || !data.email.includes("@") || !data.email.includes(".com")) 
        sendMessage("Email inválido!", "error");
      else if (data.cpf.length < 11) sendMessage("CPF inválido.", "error");
      else if (data.phonenumber.length < 8) sendMessage("Telefone inválido.", "error");
      else if (!isValidDate(data.birthdate)) sendMessage("Data de nascimento inválida!", "error");

      else sendMessage('Campos com dados inválidos!', 'error');
    };
  }

  function handleInput(event, type) {
    let str = event.target.value;

    switch (type) {
      case 'name':
        setName(event.target.value);
        break;

      case 'cpf':
        event.target.value = str.replace(/\D/g, ""); // somente numeros
        setCpf(event.target.value);
        break;

      case 'birthdate':
        event.target.value = str.replace(/[^0-9/]/g, ""); // somente data
        setBirthdate(event.target.value);
        break;

      case 'phonenumber':
        event.target.value = str.replace(/[^0-9() ]/g, ""); // somente telefone
        setPhonenumber(event.target.value);
        break;

      case 'email':
        setEmail(event.target.value);
        break;

      case 'emailConfirm':
        setEmailConfirm(event.target.value);
        break;

      case 'password':
        setSenha(event.target.value);
        break;

      case 'passwordConfirm':
        setSenhaConfirm(event.target.value);
        break;

      default:
        break;
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
  }

  function validateAllFields(data) {

    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cpf !== "" && data.cpf.length === 11 &&
      data.email !== "" && data.email.includes("@") && data.email.includes(".com") &&
      data.phonenumber !== "" && data.phonenumber.length >= 8 && 
      data.password    !== "" && data.password.length >= 8 &&
      email === emailConfirm &&
      senha === senhaConfirm &&
      isValidDate(data.birthdate)
    ) return true;

    else return false;
  }

  return (
    <div className={classes.formulario}>
      <form onSubmit={(e) => handleRegister(e)}>
        <div>
        <Grid container spacing={useMediaQuery("(min-width:960px)") ? 5 : 0}>
          <Grid item xs={12} md={6}>
            <TextField
              name="name"
              className={classes.inputForm}
              value={name}
              label="Nome Completo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'name')}
              required
              disabled={mode === 'view'}
            />

            <TextField
              name="cpf"
              className={classes.inputForm}
              value={formData.cpf}
              label="CPF"
              type="text"
              inputProps={{ maxLength: 11 }}
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'cpf')}
              required
              disabled={!(mode === 'create')}
            />

            <TextField
              name="birthdate"
              className={classes.inputForm}
              label="Data de Nascimento"
              value={birthdate}
              helperText="*Obrigatório"
              inputProps={{ maxLength: 10 }}
              variant="filled"
              onChange={(e) => handleInput(e, 'birthdate')}
              type="text"
              required
              disabled={mode === 'view'}
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
              onChange={(e) => handleInput(e, 'phonenumber')}
              required
              disabled={mode === 'view'}
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
        </div>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
