import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  useMediaQuery
} from "@material-ui/core";
import api from "../../services/api";
import { useStyles } from "./cadastroUsuarioStyle";
import { AuthContext } from "../../context/AuthContext";
import isValidDate from '../../services/dateValidation';

function CadastroPF(props) {
 
  const { 
    formData, 
    handleChangeCheck, 
    handleChangeInput, 
    mode,
    type 
  } = props;

  const classes = useStyles();
  const buttonRef = useRef(null);
  const { sendMessage } = useContext(AuthContext);
  const [existingCPF, setExistingCPF] = useState([]);

  // variaveis de input
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [address, setAddress] = useState('');
  const [zipcode, setZipcode] = useState('');
  
  // salva os valores quando os dados chegarem
  // usado em caso de edição
  useEffect(() => {

    setName(formData.name);
    setCpf(formData.cpf);
    setBirthdate(formData.birthdate);
    setEmail(formData.email);
    setPhonenumber(formData.phonenumber);
    setAddress(formData.address);
    setZipcode(formData.zipcode);
    
  }, [formData])

  // pega os CPF que já existem ao carregar a página
  useEffect(() => getExistingCPF(), []);

  function getExistingCPF() {

    api
      .get('/user')
      .then(response => {
        let auxArray = [];

        for (let i = 0; i < response.data.user.length; ++i) {
          auxArray.push(response.data.user[i].cpf)
        }
        setExistingCPF(auxArray);
      })
      .catch(error => {
        console.log(error.response);
      });
    
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

      case 'address':
        setAddress(event.target.value);
        break;

      case 'zipcode':
        event.target.value = str.replace(/\D/g, ""); // somente numeros
        setZipcode(event.target.value);
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
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
  }

  function validateAllFields(data) {

    if (
      data.type  !== "" &&
      data.name  !== "" &&
      data.cpf   !== "" && data.cpf.length === 11 &&
      data.email !== "" && data.email.includes("@") && data.email.includes(".com") &&
      data.phonenumber !== "" && data.phonenumber.length >= 8 && 
      data.password    !== "" && data.password.length >= 6 &&
      data.address     !== "" &&
      data.zipcode     !== "" && data.zipcode.length >= 8 &&
      email === emailConfirm &&
      senha === senhaConfirm &&
      !existingCPF.includes(data.cpf) &&
      isValidDate(data.birthdate)
    ) return true;

    else return false;
  }

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      type: type,
      name: name,
      birthdate: birthdate,
      cpf: cpf,
      email: email,
      phonenumber: phonenumber,
      password: senha,
      address: address,
      zipcode: zipcode
    };

    if (validateAllFields(data)) { 
      sendMessage('Realizando cadastro...', 'info', null);
      api
        .post("/user/create", data)
        .then((response) => {
          sendMessage('Cadastrado com sucesso');
        })
        .catch ((error) => {
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
          sendMessage(`Error: ${error.message}`, 'error');
      })

      // adiciona o novo CPF cadstrado na lista 
      setExistingCPF([...existingCPF, data.cpf]);

    } else { // mensagens (snackbar) de erros
      if      (email !== emailConfirm) sendMessage("Os emails estão diferentes.", "error");
      else if (senha !== senhaConfirm) sendMessage("As senhas estão diferentes.", "error");
      else if (existingCPF.includes(data.cpf)) sendMessage("CPF já cadastrado!", "error");
      else if (data.password.length < 6) sendMessage("Senha deve ter no mínimo 6 caracteres!", "error");
      else if (data.email === "" || !data.email.includes("@") || !data.email.includes(".com")) 
        sendMessage("Email inválido!", "error");
      else if (data.cpf.length < 11) sendMessage("CPF inválido.", "error");
      else if (data.zipcode.length < 8) sendMessage("CEP inválido.", "error");
      else if (data.phonenumber.length < 8) sendMessage("Telefone inválido.", "error");
      else if (!isValidDate(data.birthdate)) sendMessage("Data de nascimento inválida!", "error");

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
              label="Nome Completo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'name')}
              required
              disabled= {mode === 'view'}
            />

            <TextField
              name="cpf"
              className={classes.inputForm}
              value={cpf}
              label="CPF"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 11 }}
              onChange={(e) => handleInput(e, 'cpf')}
              required
              disabled= {mode !== 'create'}
            />

            <TextField
              name="birthdate"
              className={classes.inputForm}
              label="Data de Nascimento"
              value={birthdate}
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 10 }}
              onChange={(e) => handleInput(e, 'birthdate')}
              type="text"
              disabled= {mode === 'view'}
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
              onChange={(e) => handleInput(e, 'phonenumber')}
              required
              disabled= {mode === 'view'}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="address"
              className={classes.inputForm}
              value={address}
              label="Endereço"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              disabled= {mode === 'view'}
              onChange={(e) => handleInput(e, 'address')}
              required
            />

            <TextField
              name="zipcode"
              className={classes.inputForm}
              value={zipcode}
              label="CEP"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 8 }}
              disabled= {mode === 'view'}
              onChange={(e) => handleInput(e, 'zipcode')}
              required
            />

            <TextField
              name="email"
              className={classes.inputForm}
              value={email}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              disabled= {mode !== 'create'}
              onChange={(e) => handleInput(e, 'email')}
              required
            />

            {
              mode === 'create' && 
              <>
                <TextField
                  name="emailConfirm"
                  className={classes.inputForm}
                  value={emailConfirm}
                  label="Confirmar e-mail"
                  type="email"
                  helperText="*Obrigatório"
                  variant="filled"
                  onChange={(e) => handleInput(e, 'emailConfirm')}
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
                  onChange={(e) => handleInput(e, 'password')}
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
                  onChange={(e) => handleInput(e, 'passwordConfirm')}
                  required
                />
              </>
            }

           <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  name="emailPromocional"
                  checked={formData.emailPromocional}
                  onChange={handleChangeCheck}
                  color="primary"
                  size="small"
                  disabled={mode === 'view'}
                />
              }
              label="Desejo receber emails promocionais" />
          </Grid>
            { mode === 'create' &&
                <Grid item xs={12}>
                  <Button 
                    type="submit" 
                    ref={buttonRef} 
                    className={classes.buttonRegister}
                  >
                    Cadastrar
                  </Button>
                </Grid>
            }
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPF;
