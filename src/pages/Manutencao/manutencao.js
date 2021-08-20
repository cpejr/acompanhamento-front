import React, { useState, useEffect, useContext} from "react";
import { useHistory  } from "react-router-dom";
import {CssBaseline,Paper, Button, CircularProgss} from "@material-ui/core";

import { useStyles } from "./manutencaoStyle";
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Manutencao() {
  let { id } = useParams();
  const history = useHistory();

  const [updating, setUpdating] = useState(false);
  const [equipmentData, setEquipmentData] = useState({});
  const [equipmentDataOriginal, setEquipmentDataOriginal] = useState({});
  const { sendMessage } = useContext(AuthContext);

  // variaveis do snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [messageSnackbar, setMessageSnackbar] = useState("");
  const [typeSnackbar, setTypeSnackbar] = useState("info");
  const [loading, setLoading] = useState(false);

  const classes = useStyles({ updating });

  // pega os dados do usuário com o id
  useEffect(() => {
    console.log(id);
    try {
       api 
      .get(`/equipment/${id}`)
      .then((response) => {
        setEquipmentData(response.data.equipment);
        setEquipmentDataOriginal(response.data.equipment);
      })
    } catch (error) {
      console.warn(error);
        alert("Erro ao buscar Equipamentos");
    }},
    [id]);

  function handleChangeInput(event) {
    const { maintenance, value } = event.target;
    setEquipmentData({ ...equipmentData, [maintenance]: value });
  }

  async function handleSubmit() {

    if (!updating) setUpdating(true);
    else {
      setLoading(true);

      try {
        console.log(id);
        const updatedFields = {
          maintenance: document.getElementById("input").value
        }
          api
            .put(`/equipment/${id}`, updatedFields)
            .then((response) => {
              console.log(response);
              sendMessage("Manutenção atualizada com sucesso!", "success");
            })

          setUpdating(false);
          setLoading(false);
        }
         catch (error) {
        console.log(error);

        sendMessage("Falha ao atualizar a manutenção", "error");
        setUpdating(false);
      }
    }
  }


    return (
            <React.Fragment>
              <CssBaseline />
              <div className={classes.root}>
                <h1 className={classes.title}>Manutenção</h1>
                <Paper className={classes.containerForm} elevation={0}>
                  <div className={classes.centralizar} >
                    <form >
                    <label className={classes.textForm}>
                    <textarea id="input" className={classes.input} type="text" size="100" maxLength="default" > 
                    </textarea>
                    </label>
                    </form>
                    <div className={classes.centralizar2}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={handleChangeInput}
                      >
                      Editar
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        onClick={handleSubmit}
                      >
                      Salvar
                      </Button>
                      
                    </div>
                  </div>
                </Paper>
              </div>
            </React.Fragment>
          );
    
}