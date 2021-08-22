import React, { useState, useEffect, useContext } from "react";
import { CssBaseline, Paper, Button, TextField } from "@material-ui/core";
import { useStyles } from "./manutencaoStyle";
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

export default function Manutencao() {
  let { id } = useParams();
  const { sendMessage } = useContext(AuthContext);

  // variaveis do snackbar
  const [maintenance, setMaintenance] = useState("")
  const [maintenanceOriginal, setMaintenanceOriginal] = useState("")
  const [editing, setEditing] = useState(false);
  const classes = useStyles({ editing });

  // pega os dados do usuário com o id
  useEffect(() => {
    try {
      api
        .get(`/equipment/${id}`)
        .then((response) => {
          setMaintenanceOriginal(response.data.equipment[0].maintenance);
          setMaintenance(response.data.equipment[0].maintenance);
        })
    } catch (error) {
      console.warn(error);
      alert("Erro ao buscar Equipamentos");
    }
  }, [id]);

  async function handleSubmit() {
    setEditing(false);
    try {
      const updatedFields = {
        maintenance: maintenance
      }
      api
        .put(`/equipment/${id}`, updatedFields)
        .then((response) => {
          sendMessage("Manutenção atualizada com sucesso!", "success");
        })
    }
    catch (error) {
      console.log(error);
      sendMessage("Falha ao atualizar a manutenção", "error");
    }
  }
  function handleEdit(){
    if(editing){
      setEditing(false);
      setMaintenance(maintenanceOriginal);
    }
    else{
      setEditing(true);
    } 
   }


  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
        <h1 className={classes.title}>Manutenção</h1>
        <Paper className={classes.containerForm} elevation={0}>
          <div className={classes.centralizar} >

            <TextField
              name="maintenance"
              label="Manutenção"
              type="text"
              variant="filled"
              required
              multiline
              minRows={10}
              maxRows={20}
              fullWidth
              disabled={!editing}
              onChange={(e) => setMaintenance(e.target.value)}
              value={maintenance}
            />

            <div className={classes.centralizar2}>
              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleEdit}
              >
                {
                  editing? "Cancelar" : "Editar"
                }
              </Button>

              <Button
                variant="contained"
                color="primary"
                className={classes.btn}
                disabled={!editing}
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