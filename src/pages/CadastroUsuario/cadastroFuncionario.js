import React, { useRef, useState, useEffect } from "react";
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

function CadastroFuncionario(props) {
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
  const [zipcode, setZipcode] = useState('');

  // seta os valores quando os dados chegarem
  useEffect(() => {
    setName(formData.name);
    setCpf(formData.cpf);
    setBirthdate(formData.birthdate);
    setEmail(formData.email);
    setPhonenumber(formData.phonenumber);
    setAddress(formData.address);
    setZipcode(formData.zipcode);
  }, [formData])

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
      zipcode: zipcode
    };
    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cpf !== "" &&
      data.email !== "" &&
      data.number !== "" &&
      data.password !== "" &&
      data.address !== "" &&
      data.zipcode !== ""
    ) {
      if (email !== emailConfirm) alert("Os emails estão diferentes.");
      if (senha !== senhaConfirm) alert("As senhas não batem.");
      try {
        console.log("OPA", data);
        const response = await api.post("/user", data);
        alert(`Você foi cadastrado com sucesso.`);
      } catch (err) {
        alert.error("Teve um erro no cadastro, tente novamente.");
      }
    } else alert("Todos os campos devem estar preenchidos");
  }

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

      case 'zipcode':
        setZipcode(event.target.value);
        break;

      case 'email':
        setEmail(event.target.value);
        break;
    }

    handleChangeInput(event); // retorna para a AtualizaUsuario
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
              // inputRef={nomeRef} onKeyPress={e => nextInput(e, relacionamentosRef)}
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
              disabled= {!(mode === 'create')}
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="birthdate"
              className={classes.inputForm}
              label="Data de Nascimento"
              defaultValue="2017-05-24"
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

            <TextField
              name="address"
              className={classes.inputForm}
              value={address}
              label="Endereço"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'address')}
              required
              disabled= {mode === 'view'}
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="zipcode"
              className={classes.inputForm}
              value={zipcode}
              label="CEP"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'zipcode')}
              required
              disabled= {mode === 'view'}
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            />

            <TextField
              name="email"
              className={classes.inputForm}
              value={formData.email}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => handleInput(e, 'email')}
              required
              disabled= {mode !== 'create'}
            />

            {
              mode === 'create' && (
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
                    onChange={(e) => setSenhaConfirm(e.target.value)}
                    required
                  />
                </>
              ) 
                
            }
            

            {/* <TextField
              name="situacao"
              autoComplete="off"
              className={classes.inputForm}
              value={formData.senhaConfirmar}
              label="Situação"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setSituacao(e.target.value)}
              disabled= {mode === 'view'}
              required
              // onKeyPress={e => nextInput(e, relacionamentosRef)}
            /> */}

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
              label="Desejo receber emails promocionais"
            />
          </Grid>
          {mode === 'create' &&
            <Grid item xs={12}>
              <Button type="submit" ref={buttonRef} className={classes.buttonRegister}>Cadastrar</Button>
            </Grid>
          }
        </Grid>
      </form>
    </div>
  );
}

export default CadastroFuncionario;
