import React, { useRef, useState } from "react";
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

function CadastroPJ(props) {
  const { handleChangeCheck, handleSubmit, formData, handleChangeInput, mode } = props;

  const classes = useStyles();
  const buttonRef = useRef(null);
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  async function handleRegister() {
    const data = {
      type: props.type,
      name: name,
      cnpj: cnpj,
      email: email,
      number: number,
      password: senha,
    };
    if (
      data.type !== "" &&
      data.name !== "" &&
      data.cnpj !== "" &&
      data.email !== "" &&
      data.number !== "" &&
      data.password !== ""
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

  return (
    <div>
      <form onSubmit={() => handleRegister()}>
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
              disabled= {mode === 'view'}
              required
            />

            <TextField
              name="cnpj"
              className={classes.inputForm}
              value={formData.cnpj}
              label="CNPJ"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              onChange={(e) => setCnpj(e.target.value)}
              disabled= {mode === 'view'}
              required
            />

            <TextField
              name="telefone"
              className={classes.inputForm}
              value={formData.telefone}
              label="Número de telefone"
              type="text"
              helperText="*Obrigatório"
              variant="filled"
              inputProps={{ maxLength: 11 }}
              onChange={(e) => setNumber(e.target.value)}
              disabled= {mode === 'view'}
              required
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
              disabled= {mode !== 'create'}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {
              mode === 'create' &&
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
              label="Desejo receber emails promocionais"
            />
          </Grid>
          <Grid item xs={12}>
          { mode === 'create' &&
            <Grid item xs={12}>
              <Button type="submit"
                      ref={buttonRef} className={classes.buttonRegister}>
                Cadastrar
              </Button>
            </Grid>
          }
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CadastroPJ;
