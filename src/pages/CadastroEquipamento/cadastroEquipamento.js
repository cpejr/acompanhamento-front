import React, { useState, useContext } from 'react';
import {
  CssBaseline,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Backdrop,
  Paper,
  useMediaQuery,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  MenuItem
} from "@material-ui/core"
import { useStyles } from './cadastroEquipamentoStyle';
import api from '../../services/api';
import { format, parseISO, isAfter } from 'date-fns';
import { AuthContext } from '../../context/AuthContext'
import { useHistory } from 'react-router';
import ModalRedirect from '../../components/ModalRedirect/ModalRedirect';
import { LoginContext } from '../../context/LoginContext';

export default function CadastroEquipamento(props) {

  const history = useHistory();
  const { sendMessage } = useContext(AuthContext);
  const { getUser } = useContext(LoginContext);
  const isMobile = useMediaQuery("(min-width:960px)");

  const [error, setError] = React.useState({
    cpf_client: "",
    installation_date: ""
  });
  const [models, setModels] = React.useState([{}]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [idCadastrado, setIdCadastrado] = useState();

  const [user, setUser] = useState();

  // Mecanismo do Form
  const [formData, setFormData] = useState({
    id_model: "",
    equipment_code: "",
    installation_date: format(new Date(), "yyyy-MM-dd"),
    situation: "Ok",
    cpf_client: "",
    observation: "",
    address: "",
    zipcode: "",
  });

  // pegar modelos
  React.useEffect(() => {

    api.get('model/index')
      .then(model => {
        const models = model.data.data;
        setModels(models);
      })
      .catch(error => {
        console.log(error);
        sendMessage(`Error 504: ${error.message}`, 'error')
      });

    setLoading(false);

    async function getUserFromSession() {
      setUser(await getUser());
    }

    getUserFromSession();

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function validateAllFields(data) {

    if (
      !data.id_model ||
      !data.equipment_code ||
      !data.installation_date
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

  async function handleSubmit(event) {

    event.preventDefault();

    setError({
      cpf_client: "",
      installation_date: ""
    })

    if (isAfter(parseISO(formData.installation_date), new Date()))
      setError(prev => ({ ...prev, installation_date: "Data inválida!" }))

    else if (validateAllFields(formData)) {

      const data = {
        id_model: formData.id_model,
        equipment_code: formData.equipment_code,
        installation_date: formData.installation_date,
        initial_work: formData.installation_date,
        situation: formData.situation,
        address: formData.address,
        zipcode: formData.zipcode,
        observation: formData.observation
      }

      //enviar para o backend
      sendMessage('Realizando cadastro...', 'info', null);

      try {
        let createdEquipment;
        
        await api
          .post('/equipment/create', data)
          .then((response) => {
            console.log(response);
            createdEquipment = response;
          })
          .catch((error) => {
            console.log(error.response);
            if (error.response.status === 400) {
              sendMessage(error.response.data.notification, "error")
            } 
          });

        let arrayEquipments = user.id_equipments;

        if (createdEquipment) {

          if (arrayEquipments) {
            arrayEquipments.push(createdEquipment.data.id);
          } else {
            arrayEquipments = [createdEquipment.data.id];
          }
  
          // atualiza o vetor de id_equipments
          await api.put(`/user/${user.id}`, { id_equipments: arrayEquipments })
          user.id_equipments = arrayEquipments;
  
          if (createdEquipment.data && createdEquipment.data.id) {
            setIdCadastrado(createdEquipment.data.id);
            sendMessage('Cadastrado com sucesso')
          };
        } else return;
        
      } catch (err) {
        sendMessage('Error 501: Falha no cadastro', 'error')
        console.warn(err);
      }
      setOpenModal(true);
    }
  }

  function handleChangeInput(event, fromFormControl = false) {

    let { name, value } = event.target;
    let str = value;

    if (fromFormControl) { // vem do seletor de modelos

      const selectedModel = models.find(model => model.id === value);
      setFormData({ ...formData, id_model: selectedModel.id });
    } else {

      if (name === "zipcode") {
        value = str.replace(/[^0-9]/g, ""); // somente numeros e '-'
      }
      setFormData({ ...formData, [name]: value });
    }

  }

  const classes = useStyles();

  if (loading) {
    return (
      <React.Fragment>
        <Backdrop className={classes.backdrop} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <Typography variant="h3" className={classes.title}>
          Cadastro de um novo equipamento
        </Typography>

        <Paper className={classes.formContainer} elevation={0}>

          <Grid container spacing={isMobile ? 5 : 0} >
            <Grid item xs={12} md={6} className={classes.grid}>

              <FormControl variant="filled" className={classes.inputType}>
                <InputLabel>Modelo do Equipamento</InputLabel>
                <Select
                  labelId="tipo"
                  onChange={(e) => handleChangeInput(e, true)}
                  value={formData.id_model}
                >
                  {models.map((model, index) => {
                    return (
                      <MenuItem key={index} value={model.id}>{model.modelName}</MenuItem>
                    )
                  })}
                </Select>
                <FormHelperText style={{ marginBottom: "16px" }}>*Obrigatório</FormHelperText>
              </FormControl>

              <TextField
                name="equipment_code"
                className={classes.inputs}
                value={formData.equipment_code}
                onChange={handleChangeInput}
                label="Código do Equipamento"
                type="text"
                helperText="*Obrigatório"
                variant="filled"
                required
                autoComplete="off"
              />

              <TextField
                name="installation_date"
                className={classes.inputs}
                value={formData.installation_date}
                onChange={handleChangeInput}
                label="Data de Instalação"
                type="date"
                helperText={error.installation_date === "" ? "*Obrigatório" : error.installation_date}
                error={error.installation_date !== ""}
                variant="filled"
                autoComplete="off"
              />

            </Grid>

            <Grid item xs={12} md={6}>

              <TextField
                name="observation"
                className={classes.inputs}
                value={formData.observation}
                onChange={handleChangeInput}
                label="Observações"
                type="text"
                helperText="(Opcional)"
                autoComplete="off"
                variant="filled"
              />

              <TextField
                name="address"
                className={classes.inputs}
                value={formData.address}
                onChange={handleChangeInput}
                label="Endereço"
                type="text"
                helperText="(Opcional)"
                autoComplete="off"
                variant="filled"
              />

              <TextField
                name="zipcode"
                className={classes.inputs}
                value={formData.zipcode}
                onChange={handleChangeInput}
                label="CEP"
                type="text"
                helperText="(Opcional)"
                autoComplete="off"
                variant="filled"
                inputProps={{ maxLength: 8 }}
              />

            </Grid>

          </Grid>


          <div className={classes.buttonContainer}  >
            <Button
              variant="contained"
              color="primary"
              className={classes.buttonRegister}
              onClick={handleSubmit}
            >
              Cadastrar
            </Button>
          </div>

          <ModalRedirect
            openModal={openModal}
            closeModal={() => setOpenModal(false)}
            linkId={() => history.push(`/ae/` + idCadastrado)}
          />

        </Paper>

      </div>

    </React.Fragment>
  )
}
