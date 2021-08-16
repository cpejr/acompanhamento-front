import React, { useState, useEffect, useContext} from "react";
import { Link, useLocation,  useHistory  } from "react-router-dom";
import {CssBaseline,Paper, Button} from "@material-ui/core";
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useStyles } from "./manuntencaoStyle";
import { useParams } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import moment from 'moment';


export default function Manuntencao() {
  const { id } = useParams();
  const history = useHistory();

  const classes = useStyles();
  const [updating, setUpdating] = useState(false);
  const [equipment, setEquipment] = useState({});
  const [equipmentOriginal, setEquipmentOriginal] = useState({});
  const [modelsList, setModelsList] = useState([]);
  const [loading, setLoading] = useState({ equipment: true, models: true });
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState({
    maintenance: "",
  });
  const { sendMessage } = useContext(AuthContext);

  useEffect(() => {
    function getRequiredDateFormat(timeStamp, format = "YYYY-MM-DD") {
      return moment(timeStamp).format(format);
    }
    api
    .get(`equipment/${id}`)
    .then((selected) => {
      var date = selected.data.equipment[0].maintenance;
      var maintenance = getRequiredDateFormat(date);

      setEquipment(selected.data.equipment[0]);
      setEquipmentOriginal(selected.data.equipment[0]);
      setEquipment((prev) => ({ ...prev, maintenance }));
      setEquipmentOriginal((prev) => ({ ...prev, maintenance }));
      setLoading((prev) => ({ ...prev, equipment: false }));
    })
    .catch((err) => {
      console.error("Backend is not working properly", err);
    });

    api
      .get(`model/index`)
      .then((models) => {
        console.log(models);
        setModelsList(models.data.data);
        setLoading((prev) => ({ ...prev, models: false }));
      })
      .catch((err) => {
        console.error("Backend is not working properly", err);
      });

  }, [id]);


    return (
            <React.Fragment>
              <CssBaseline />
              <div className={classes.root}>
                <h1 className={classes.title}>Manuntenção</h1>
                <Paper className={classes.containerForm} elevation={0}>
                  <div className={classes. centralizar} >
                    <form >
                    <label className={classes.textForm}>
                    <textarea  className={classes.input} type="text" size="100" maxLength="default" > 
                    </textarea>
                    </label>
                    </form>
                    <div className={classes.centralizar2}>
                      <Button
                        variant="contained"
                        color="primary"
                        className={classes.btn}
                        // onClick={handleSubmit}
                      >
                        {updating ? "Salvar" : "Editar"}
                      </Button>

                      <Button
                        variant="contained"
                        color="secondary"
                        className={classes.btn}
                        // onClick={handleDelete}
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