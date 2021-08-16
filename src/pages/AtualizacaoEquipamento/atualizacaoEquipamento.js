import React, { useState, useEffect, useContext } from "react";
import {
  CssBaseline,
  Link,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  Backdrop,
  CircularProgress
} from "@material-ui/core"
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { useParams } from 'react-router';
import { useStyles } from './atualizacaoEquipamentoStyle'
import { Autocomplete } from '@material-ui/lab';
import { LoginContext } from '../../context/LoginContext';

function AtualizacaoEquipamento() {
  const { id } = useParams();
  const history = useHistory();
  const { getToken } = useContext(LoginContext);
  const accessToken = getToken();
  

  const [updating, setUpdating] = useState(false);
  const [equipment, setEquipment] = useState({});
  const [equipmentOriginal, setEquipmentOriginal] = useState({});
  const [modelsList, setModelsList] = useState([]);
  const [loading, setLoading] = useState({ equipment: true, models: true });
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    installation_date: "",
  });

  const { sendMessage } = useContext(AuthContext);
  const [modelName, setModelName] = useState("");

  useEffect(() => {
    function getRequiredDateFormat(timeStamp, format = "YYYY-MM-DD") {
      return moment(timeStamp).format(format);
    }

    api
      .get(`equipment/${id}`, {headers: {authorization: `Bearer ${accessToken}`}})
      .then((selected) => {
        var date = selected.data.equipment[0].installation_date;
        var installation_date = getRequiredDateFormat(date);

        setEquipment(selected.data.equipment[0]);
        setEquipmentOriginal(selected.data.equipment[0]);
        setEquipment((prev) => ({ ...prev, installation_date }));
        setEquipmentOriginal((prev) => ({ ...prev, installation_date }));
        setLoading((prev) => ({ ...prev, equipment: false }));
      })
      .catch((err) => {
        console.error("Backend is not working properly", err);
      });

    api
      .get(`model/index`, {headers: {authorization: `Bearer ${accessToken}`}})
      .then((models) => {
        console.log(models);
        setModelsList(models.data.data);
        setLoading((prev) => ({ ...prev, models: false }));
      })
      .catch((err) => {
        console.error("Backend is not working properly", err);
      });

  }, [accessToken, id]);

  const classes = useStyles({ updating });

  useEffect(() =>{

    if (modelsList && equipment) {
      modelsList.find((model) => {
        if (model.id === equipment.id_model)
          setModelName(model.modelName);
      })
    }
  }, [modelsList, equipment]);

  if (!equipment) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>Detalhes do Equipamento</h1>
          <Paper className={classes.containerForm} elevation={0}>
            <Typography variant="h5">Dados inválidos!</Typography>
          </Paper>
        </div>
      </React.Fragment>
    );
  }

  function handleChangeInput(event) {
    let { name, value } = event.target;
    let str = value;

    if (name === "zipcode") {
      value = str.replace(/[^0-9]/g, ""); // somente numeros e '-'
    }

    setEquipment((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeAutocomplete(event, value) {

    modelsList.find((model) => {
      if (model.modelName === value) {
        equipment.id_model = model.id;
      }
    })
  }

  function handleSubmit() {

    setError({
      installation_date: "",
    });

    if (!updating) setUpdating(true);

    else if (!findError("date", equipment.installation_date)) {
      setError((prev) => ({ ...prev, installation_date: "Data inválidaaaaa" }));
      console.log(equipment.installation_date);

    } else if (isAfter(parseISO(equipment.installation_date), new Date()))
      setError((prev) => ({ ...prev, installation_date: "Data inválida" }));

    else {
      console.log(equipment);
      const {
        id_model,
        equipment_code,
        installation_date,
        situation,
        initial_work,
        address,
        zipcode,
        // cpf_client
      } = equipment;

      const data = {
        id_model,
        equipment_code,
        installation_date,
        situation,
        initial_work,
        // cpf_client,
        address,
        zipcode,
      };

      sendMessage("Alterando dados...", "info", null);

      api
        .put(`equipment/${id}`, data, {headers: {authorization: `Bearer ${accessToken}`}})
        .then((response) => {
          sendMessage("Dados alterados");
          setEquipmentOriginal(response.data.equipment);
        })
        .catch((err) => {
          sendMessage(`Erro: ${err.message}`, "error");
          console.log(err);
        });
      setUpdating(false);
    }
  }

  function handleDelete(confirmation) {
    if (updating) {
      //cancelar
      setUpdating(false);
      setEquipment(equipmentOriginal);
      setError({
        installation_date: "",
      });
    } else if (confirmation === true) {
      // excuir de verdade
      setDeleting(false);
      sendMessage("Excluindo equipamento...", "info", null);

      api.delete(`equipment/${id}`, {headers: {authorization: `Bearer ${accessToken}`}}).then((response) => {
        sendMessage("Equipamento excluído com sucesso");
        history.push("/listagemequipamento");
      }).catch((err) => {
        sendMessage(`Erro ao excluir o equipamento: ${err.message}`, "error");
        console.log(err)
      })
    }
    else { // confirmar exclusão
      setDeleting(true);
    }
  }

  const AreYouSure = () => (
    <Dialog open={deleting} onClose={() => setDeleting(false)}>
      <DialogTitle>Excluir equipamento?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este equipamento?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setDeleting(false)}>
          Cancelar
        </Button>
        <Button color="secondary" onClick={() => handleDelete(true)}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (loading.equipment || loading.models) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <h1 className={classes.title}>Detalhes do Equipamento</h1>

        <AreYouSure />

        <Paper className={classes.containerForm} elevation={0}>
          <div className={classes.leftSection}>
            <TextField
              freeSolo
              className={classes.input}
              options={modelsList.map((model) => model.modelName)}
              onChange={handleChangeAutocomplete}
              label="Modelo"
              variant="filled"
              disabled={!updating}
              value={modelName}
              renderInput={(params) => (
                <TextField
                  name="id_model"
                  {...params}
                  value={equipment.id_model}
                  disabled={!updating}
                  autoComplete="off"
                />
              )}
            />
            
            {/* <TextField
              name="cpf_client"
              className={classes.input}
              value={equipment.cpf_client}
              label="CPF / CNPJ" 
              variant="filled"
              disabled={!updating}
              onChange={handleChangeInput}
            /> */}

            <TextField
              name="equipment_code"
              className={classes.input}
              value={equipment.equipment_code}
              label="Código do equipamento"
              variant="filled"
              disabled={!updating}
              // onChange={handleChangeInput}
            />

            <TextField
              name="installation_date"
              className={classes.input}
              value={equipment.installation_date}
              label="Data instalação"
              type="date"
              helperText={
                error.installation_date === ""
                  ? "*Obrigatório"
                  : error.installation_date
              }
              error={error.installation_date !== ""}
              variant="filled"
              disabled={!updating}
              onChange={handleChangeInput}
            />

            <TextField
              name="observation"
              className={classes.input}
              value={equipment.observation}
              label="Observações"
              type="text"
              variant="filled"
              disabled={!updating}
              onChange={handleChangeInput}
            />

            <TextField
              name="address"
              className={classes.input}
              value={equipment.address}
              onChange={handleChangeInput}
              label="Endereço"
              type="text"
              helperText="(Opcional)"
              autoComplete="off"
              disabled={!updating}
              variant="filled"
            />

            <TextField
              name="zipcode"
              className={classes.input}
              value={equipment.zipcode}
              onChange={handleChangeInput}
              label="CEP"
              type="text"
              helperText="(Opcional)"
              autoComplete="off"
              disabled={!updating}
              variant="filled"
              inputProps={{ maxLength: 8 }}
            />
            <div className={classes.buttonContainer} >
              <div className={classes.centralizar}>
                <Button
              component={Link}
              // to={`/au/${userId}`}
              className={classes.buttonAdd}
              variant="outlined"
              >
              Proprietário do equipamento
              </Button>
              </div>

              <div className={classes.centralizar}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.btn}
                  onClick={handleSubmit}
                >
                  {updating ? "Salvar" : "Editar"}
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.btn}
                  onClick={handleDelete}
                >
                  {updating ? "Cancelar" : "Excluir"}
                </Button>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default AtualizacaoEquipamento;
