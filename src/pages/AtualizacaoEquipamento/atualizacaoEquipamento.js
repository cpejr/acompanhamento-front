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
  Grid,
  Typography,
  Backdrop,
  CircularProgress,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem,
  Chip,
} from "@material-ui/core"
import api from '../../services/api';
import { AuthContext } from '../../context/AuthContext'
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { parseISO, isAfter } from 'date-fns';
import findError from '../../services/findError';
import { useParams } from 'react-router';
import { useStyles } from './atualizacaoEquipamentoStyle'
import { LoginContext } from '../../context/LoginContext';

// icons
import SignalWifiOffIcon from '@material-ui/icons/SignalWifiOff';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


function AtualizacaoEquipamento() {

  const { id } = useParams();
  const history = useHistory();
  const { getToken, IsClient } = useContext(LoginContext);
  const accessToken = getToken();

  const isDesktop = useMediaQuery("(min-width:960px)");

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
  const [clientId, setClientId] = useState("");
  const [clientCpfCnpj, setClientCpfCnpj] = useState("");
  const [disableCpfCnpj, setDisableCpfCnpj] = useState(false);
  const [modelId, setModelId] = useState();
  const classes = useStyles({ updating });

  useEffect(() => {

    function getRequiredDateFormat(timeStamp, format = "YYYY-MM-DD") {
      return moment(timeStamp).format(format);
    }

    api
      .get(`equipment/${id}`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((response) => {
        const date = response.data.equipment[0].installation_date;
        const installation_date = getRequiredDateFormat(date);
        const equipment = response.data.equipment[0];

        setEquipment({ ...equipment, installation_date: installation_date });
        setEquipmentOriginal({ ...equipment, installation_date: installation_date });
        setLoading((prev) => ({ ...prev, equipment: false }));
        setClientId(response.data.equipment[0].client_id)
      })
      .catch((err) => {
        console.error("Erro ao buscar equipamento.", err);
      });

    api
      .get(`model/index`, { headers: { authorization: `Bearer ${accessToken}` } })
      .then((models) => {
        setModelsList(models.data.data);
        setLoading((prev) => ({ ...prev, models: false }));
      })
      .catch((err) => {
        console.error("Erro ao buscar modelos.", err);
      });

  }, [accessToken, id]);


  useEffect(() => {

    if (clientId) {
      api
        .get(`user/${clientId}`, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((response) => {

          setClientCpfCnpj(
            response.data.user.cpf
              ? response.data.user.cpf
              : response.data.user.cnpj
          )
          setDisableCpfCnpj(true);
        })
        .catch((err) => console.log(err));
    }

  }, [clientId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {

    if (modelsList && equipment) {
      modelsList.find((model) => {
        if (model.id === equipment.id_model) {
          setModelId(model.id);
          return true;
        } else return false;
      })
    }
  }, [modelsList, equipment]);

  function validateAllFields(data) {

    if (
      !data.id_model ||
      !data.equipment_code ||
      !data.installation_date ||
      !data.phone_number
    ) {
      sendMessage("Há campos vazios!", "error");
      return false;
    }

    if (data.zipcode !== "" && data.zipcode.length < 8) {
      sendMessage("CEP inválido!", "error");
      return false;
    }

    return true;
  }

  function getConnectionStatus() {

    if (equipment.flag_connection === "Conectado") {
      return (
        <Chip
          variant="outlined"
          icon={<RssFeedIcon className={classes.iconConnected} />}
          className={classes.connected}
          label="Conexão: Conectado"
        />
      )
    } else {
      return (
        <Chip
          variant="outlined"
          icon={<SignalWifiOffIcon className={classes.iconPending} />}
          className={classes.connectionPending}
          label="Conexão: Pendente"
        />
      )
    }
  }

  function getSituationStatus() {

    if (equipment.situation === "Ok") {
      return (
        <Chip
          variant="outlined"
          icon={<CheckCircleOutlineIcon className={classes.iconConnected} />}
          className={classes.connected}
          label="Situação: Ok"
        />
      );
    } else if (equipment.situation === "Atenção") {
      return (
        <Chip
          variant="outlined"
          icon={<WarningIcon className={classes.iconWarning} />}
          className={classes.statusWarning}
          label="Situação: Atenção"
        />
      );
    } else if (equipment.situation === "Revisão") {
      return (
        <Chip
          variant="outlined"
          icon={<ErrorOutlineIcon className={classes.iconPending} />}
          className={classes.connectionPending}
          label="Situação: Revisão"
        />
      );
    }

  }

  if (!equipment) {
    return (
      <React.Fragment>
        <CssBaseline />
        <div className={classes.root}>
          <h1 className={classes.title}>Detalhes do Equipamento</h1>
          <Paper className={classes.fromContainer} elevation={0}>
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
    if (name === "cpfcnpj") {
      value = str.replace(/\D/g, ""); // somente numeros
      setClientCpfCnpj(value)
      return;
    }
    if (name === "phone_number") {
      let cleaned = str.replace(/\D/g, ""); // somente numeros
      if (cleaned.length === 10) {            // Numero residencial
        let aux = cleaned.match(/^(\d{2})(\d{4})(\d{4})$/);
        if (aux) value = '(' + aux[1] + ') ' + aux[2] + '-' + aux[3]
      }
      else if (cleaned.length === 11) {     // Numero celular
        let aux = cleaned.match(/^(\d{2})(\d{5})(\d{4})$/);
        if (aux) value = '(' + aux[1] + ') ' + aux[2] + '-' + aux[3]
      }
    }
    setEquipment((prev) => ({ ...prev, [name]: value }));
  }

  function handleChangeSelect(event, value) {

    modelsList.find((model) => {
      if (model.id === event.target.value) {
        equipment.id_model = model.id;
        setModelId(model.id);
        return true;
      } else return false;
    })
  }

  function handleSubmit() {

    setError({
      installation_date: "",
    });

    const data = {
      id_model: modelId,
      equipment_code: equipment.equipment_code,
      installation_date: equipment.installation_date,
      situation: equipment.situation,
      initial_work: equipment.initial_work,
      address: equipment.address,
      zipcode: equipment.zipcode ? equipment.zipcode : "",
      cpfcnpj: clientCpfCnpj,
      phone_number: equipment.phone_number
    };

    if (!updating) setUpdating(true);

    else if (!findError("date", equipment.installation_date)) {
      setError((prev) => ({ ...prev, installation_date: "Data inválida" }));

    } else if (isAfter(parseISO(equipment.installation_date), new Date()))
      setError((prev) => ({ ...prev, installation_date: "Data inválida" }));

    else if (validateAllFields(data)) {

      sendMessage("Alterando dados...", "info", null);

      api
        .put(`equipment/${id}`, data, { headers: { authorization: `Bearer ${accessToken}` } })
        .then((response) => {
          sendMessage("Dados alterados com sucesso.", "success");
          setEquipmentOriginal(response.data.equipment);
          setDisableCpfCnpj(true);
          setClientId(response.data.equipment.client_id)
        })
        .catch((error) => {
          console.log(error.response);
          if (error.response.status === 400) {
            sendMessage(error.response.data.notification, "error")
          }
          setEquipmentOriginal(equipmentOriginal);
          setClientCpfCnpj("");
        });
      setUpdating(false);
    }
  }

  function handleDelete(confirmation) {
    if (updating) {

      //cancelar
      setUpdating(false);
      setEquipment(equipmentOriginal);
      setModelId(equipmentOriginal.id_model)
      setError({
        installation_date: "",
      });
      setClientCpfCnpj(clientId ? clientCpfCnpj : "");
    } else if (confirmation === true) {

      // excuir de verdade
      setDeleting(false);
      sendMessage("Excluindo equipamento...", "info", null);

      api.delete(`equipment/${id}`, { headers: { authorization: `Bearer ${accessToken}` } }).then((response) => {
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
        <div className={classes.header}>

          <Typography variant="h3" className={classes.title}>
            Detalhes do equipamento
          </Typography>

          {getSituationStatus()}

          {getConnectionStatus()}

        </div>
        <AreYouSure />
        <Paper className={classes.formContainer} elevation={0}>
          <Grid container spacing={isDesktop ? 5 : 0} >
            <Grid item xs={12} md={6}>

              <FormControl variant="filled" className={classes.inputType}>
                <InputLabel>Modelo do Equipamento</InputLabel>
                <Select
                  labelId="tipo"
                  onChange={handleChangeSelect}
                  value={modelId}
                  disabled={!updating}
                >
                  {modelsList.map((model, index) => {
                    return (
                      <MenuItem key={index} value={model.id}>{model.modelName}</MenuItem>
                    )
                  })}
                </Select>
                <FormHelperText style={{ marginBottom: "16px" }}>*Obrigatório</FormHelperText>
              </FormControl>

              <TextField
                name="equipment_code"
                className={classes.input}
                value={equipment.equipment_code}
                label="Código do equipamento"
                variant="filled"
                disabled={true}
                helperText="*Obrigatório"
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
                name="phone_number"
                className={classes.inputs}
                value={equipment.phone_number}
                onChange={handleChangeInput}
                label="Telefone para Contato"
                type="text"
                autoComplete="off"
                helperText="*Obrigatório"
                variant="filled"
                disabled={!updating}
                style={{ width: "100%" }}
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                name="observation"
                className={classes.input}
                value={equipment.observation}
                label="Observações"
                type="text"
                variant="filled"
                disabled={!updating}
                onChange={handleChangeInput}
                helperText="(Opcional)"
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
              <TextField
                name="cpfcnpj"
                className={classes.input}
                value={clientCpfCnpj ? clientCpfCnpj : ""}
                onChange={handleChangeInput}
                label="CPF / CNPJ do Proprietário"
                type="text"
                helperText="(Opcional)"
                variant="filled"
                disabled={disableCpfCnpj ? true : !updating}
              />
            </Grid>

            {!IsClient() && (
              <div className={classes.buttonContainer}>
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
                  className={classes.btn}
                  onClick={handleDelete}
                >
                  {updating ? "Cancelar" : "Excluir"}
                </Button>

                <Button
                  className={classes.btn}
                  variant="contained"
                  onClick={() => history.push(`/au/${clientId}`)}
                  disabled={!clientId}
                  style={{ backgroundColor: !clientId ? "gray" : "orange" }}
                >
                  Proprietário do equipamento
                </Button>
              </div>
            )}
          </Grid>
        </Paper>
      </div>
    </React.Fragment>
  );
}

export default AtualizacaoEquipamento;
