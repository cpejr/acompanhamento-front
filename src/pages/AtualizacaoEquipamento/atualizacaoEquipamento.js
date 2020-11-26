import React, { useState, useEffect, useContext } from "react";
import {
  CssBaseline,
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
  CircularProgress,
} from "@material-ui/core";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import moment from "moment";
import { parseISO, isAfter } from "date-fns";
import findError from "../../services/findError";
import { useParams } from "react-router";
import { useStyles } from "./atualizacaoEquipamentoStyle";
import { Autocomplete } from "@material-ui/lab";

function AtualizacaoEquipamento() {
  const { id } = useParams();
  const [updating, setUpdating] = useState(false);
  const [equipment, setEquipment] = useState({});
  const [equipmentOriginal, setEquipmentOriginal] = useState({});
  const [modelsList, setModelsList] = useState([]);
  const [loading, setLoading] = useState({ equipment: true, models: true });
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    instalation_date: "",
  });
  const { sendMessage } = useContext(AuthContext);

  useEffect(() => {
    function getRequiredDateFormat(timeStamp, format = "YYYY-MM-DD") {
      return moment(timeStamp).format(format);
    }
    api
      .get(`equipment/${id}`)
      .then((selected) => {
        var date = selected.data.equipment[0].instalation_date;
        var instalation_date = getRequiredDateFormat(date);

        setEquipment(selected.data.equipment[0]);
        setEquipmentOriginal(selected.data.equipment[0]);
        setEquipment((prev) => ({ ...prev, instalation_date }));
        setEquipmentOriginal((prev) => ({ ...prev, instalation_date }));
        setLoading((prev) => ({ ...prev, equipment: false }));
      })
      .catch((err) => {
        console.error("Backend is not working properly", err);
      });
    api
      .get(`model/index`)
      .then((models) => {
        setModelsList(models.data.data);
        setLoading((prev) => ({ ...prev, models: false }));
      })
      .catch((err) => {
        console.error("Backend is not working properly", err);
      });
  }, [id]);

  const classes = useStyles({ updating });

  useEffect(() => {
    console.log(equipment);
  }, [equipment]);

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

  function handleChangeInput(event, valueA) {
    const { name, value } = event.target;
    setEquipment((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeAutocomplete(event, value) {
    console.debug(event.target);
    setEquipment((prev) => ({ ...prev, equipment_model: value }));
  }

  function handleSubmit() {
    setError({
      instalation_date: "",
    });
    if (!updating) setUpdating(true);
    else if (Object.values(equipment).includes("")) {
      sendMessage("Alguns campos estão vazios", "info");
    } else if (!findError("date", equipment.instalation_date)) {
      setError((prev) => ({ ...prev, instalation_date: "Data inválidaaaaa" }));
      console.log(equipment.instalation_date);
    } else if (isAfter(parseISO(equipment.instalation_date), new Date()))
      setError((prev) => ({ ...prev, instalation_date: "Data inválida" }));
    else {
      console.log(equipment);
      const {
        id_model,
        id_equipment,
        equipment_model,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        cpf_client,
        observation,
        work_time,
      } = equipment;
      const data = {
        id_model,
        id_equipment,
        equipment_model,
        instalation_date,
        maintenance_date,
        last_collect_date,
        situation,
        cpf_client,
        observation,
        work_time,
      };
      sendMessage("Alterando dados...", "info", null);
      api
        .put(`equipment/${id}`, data)
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
        instalation_date: "",
      });
    } else if (confirmation === true) {
      // excuir de verdade
      setDeleting(false);
      alert("Excluindo usuário do banco de dados...");
    } else {
      // confirmar exclusão
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
            <Autocomplete
              freeSolo
              className={classes.input}
              options={modelsList.map((model) => model.modelName)}
              onChange={handleChangeAutocomplete}
              value={equipment.equipment_model}
              renderInput={(params) => (
                <TextField
                  name="equipment_model"
                  {...params}
                  value={equipment.equipment_model}
                  label="Modelo"
                  variant="filled"
                  disabled={!updating}
                  autoComplete="off"
                />
              )}
            />
            <TextField
              name="cpf_client"
              className={classes.input}
              value={equipment.cpf_client}
              label="CPF" //Trocar depois:  empresa tem cnpj e pessoa cpf massó vem cpf banco
              variant="filled"
              disabled //cpf não deve alterar
              onChange={handleChangeInput}
            />
            <TextField
              name="id_equipment"
              className={classes.input}
              value={equipment.id_equipment}
              label="Número de série"
              variant="filled"
              disabled={!updating}
              onChange={handleChangeInput}
            />
            <TextField
              name="instalation_date"
              className={classes.input}
              value={equipment.instalation_date}
              label="Data instalação"
              type="date"
              helperText={
                error.instalation_date === ""
                  ? "*Obrigatório"
                  : error.instalation_date
              }
              error={error.instalation_date !== ""}
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
            {/* </Grid> */}

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
                disabled={!updating}
              >
                {updating ? "Cancelar" : "Excluir"}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default AtualizacaoEquipamento;
