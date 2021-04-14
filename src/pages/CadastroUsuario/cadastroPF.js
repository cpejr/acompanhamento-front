import React, { useEffect, useRef, useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  useMediaQuery,
  Button,
} from "@material-ui/core";
import api from "../../services/api";
import { useStyles } from "./cadastroUsuarioStyle";
import nextInput from "../../services/nextInput";

function CadastroPF(props) {
  const { 
    formData, 
    handleChangeCheck, 
    handleChangeInput, 
    handleSubmit, 
    mode 
  } = props;

  const classes = useStyles();
  const buttonRef = useRef(null);
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  // seta os valores quando os dados chegarem
  useEffect(() => {
    setName(formData.name);
    setCpf(formData.cpf);
    setBirthdate(formData.birthdate);
    setEmail(formData.email);
    setPhonenumber(formData.phonenumber);
    setAddress(formData.address);
    setZipCode(formData.zipcode);
  }, [formData])

  function handleInput(event, type) {
    switch (type) {
      case 'name':
        setName(event.target.value);
        break;
      
      case 'cpf':
        setCpf(event.target.value);
        break;

      case 'birthdate':
        setBirthdate(event.target.value);
        break;

      case 'phonenumber':
        setPhonenumber(event.target.value);
        break;

      case 'address':
        setAddress(event.target.value);
        break;

      case 'zipCode':
        setZipCode(event.target.value);
        break;

      case 'email':
        setEmail(event.target.value);
        break;
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
  }

  async function handleRegister() {
    const data = {
      type: props.type,
      name: name,
      birthdate: birthdate,
      cpf: cpf,
      email: email,
      phonenumber: phonenumber,
      password: senha,
      address: address,
      zipCode: zipCode
    };

    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cpf !== "" &&
      data.email !== "" &&
      data.phonenumber !== "" &&
      data.password !== "" &&
      data.address !== "" &&
      data.zipCode !== "" 
    ) {
      if (email !== emailConfirm) alert("Os emails estão diferentes.");
      if (senha !== senhaConfirm) alert("As senhas não batem.");
      try {
        console.log("OPA", data);
        const response = await api.post("/user", data);
        alert(`Você foi cadastrado com sucesso.`);
      } catch (err) {
        console.log("Teve um erro no cadastro, tente novamente.");
      }
    } else alert("Todos os campos devem estar preenchidos");
  }

  return (
    <div>
      <form onSubmit={() => handleRegister()}>
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
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
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
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="birthdate"
              className={classes.inputForm}
              label="Data de Nascimento"
              value={birthdate}
              helperText="(Opcional)"
              variant="filled"
              onChange={(e) => handleInput(e, 'birthdate')}
              type="text"
              disabled= {mode === 'view'}
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="phonenumber"
              className={classes.inputForm}
              value={phonenumber}
              label="Número de telefone"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 11 }}
              onChange={(e) => handleInput(e, 'phonenumber')}
              required
              disabled= {mode === 'view'}
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
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
              value={zipCode}
              label="CEP"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              disabled= {mode === 'view'}
              onChange={(e) => handleInput(e, 'zipCode')}
              required
            />

            <TextField
              name="email"
              className={classes.inputForm}
              defaultValue={email}
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
                  name="emailConfirmar"
                  className={classes.inputForm}
                  defaultValue={formData.email}
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
                  defaultValue={formData.password}
                  label="Criar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />

                <TextField
                  name="senhaConfirmar"
                  autoComplete="off"
                  className={classes.inputForm}
                  defaultValue={formData.password}
                  label="Confirmar senha"
                  type="password"
                  helperText="*Obrigatório"
                  variant="filled"
                  onChange={(e) => setSenhaConfirm(e.target.value)}
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
                  // onKeyPress={e => nextInput(e, relacionamentosRef)}
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
