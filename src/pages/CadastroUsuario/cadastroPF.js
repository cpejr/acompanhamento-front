import React, { useRef, useState } from "react";
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
  } = props;

  const classes = useStyles();

  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [birth, setBirth] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  async function handleRegister() {
    const data = {
      name: name,
      birthdate: birth,
      cpf: cpf,
      email: email,
      number: number,
      password: senha,
    };

    try {
      console.log("OPA", data);
      const response = await api.post("/user", data);
      alert(`Você foi cadastrado com sucesso.`);
    } catch (err) {
      alert.error("Teve um erro no cadastro, tente novamente.");
    }
  }

  return (
    <div>
      <form onSubmit={() => handleSubmit("cadastroPF")}>
        <Grid container spacing={useMediaQuery("(min-width:960px)") ? 5 : 0}>
          <Grid item xs={12} md={6}>
            <TextField
              name="nome"
              className={classes.inputForm}
              value={formData.nome}
              label="Nome Completo"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              name="cpf"
              className={classes.inputForm}
              value={formData.cpf}
              label="CPF"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setCpf(e.target.value)}
            />

            <TextField
              name="nascimento"
              className={classes.inputForm}
              label="Data de Nascimento"
              defaultValue="2017-05-24"
              value={formData.nascimento}
              helperText="(Opcional)"
              variant="filled"
              type="date"
              onChange={(e) => setBirth(e.target.value)}
            />

            <TextField
              name="telefone"
              className={classes.inputForm}
              value={formData.telefone}
              label="Número de telefone"
              type="number"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setNumber(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              name="email"
              className={classes.inputForm}
              value={formData.email}
              label="Endereço de e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              name="emailConfirmar"
              className={classes.inputForm}
              value={formData.emailConfirmar}
              label="Confirmar e-mail"
              type="email"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setEmailConfirm(e.target.value)}
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
            />

            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  name="emailPromocional"
                  checked={formData.emailPromocional}
                  onChange={handleChangeCheck}
                  color="primary"
                  size="small"
                />
              }
              label="Desejo receber emails promocionais"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              ref={buttonRef}
              className={classes.buttonRegister}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPF;
