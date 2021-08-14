import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  Button,
  InputBase,
  Typography,
  MenuItem,
  FormControl,
  Select,
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import api from "../../services/api";
import moment from "moment";
import ordenar from "../../services/ordenar";
import { useStyles } from "./listagemEquipamentoStyle";
import StickyHeadTable from "./Tabela";

export default function ListagemEquipamento() {

  const classes = useStyles();

  const [filterby, setFilterby] = useState("equipment_code");
  const [equipmentsOriginal, setEquipmentsOriginal] = useState([]);
  const [modelList, setModelList] = useState([]);

  const [loading, setLoading] = useState({
    model: true,
    equipments: true,
    changeNameModel: true,
    setDisplay: true,
  });

  const [ordem, setOrdem] = useState({
    alfabetica: false,
    by: "last_collect_date",
  });
  const [equipmentsListToDisplay, setEquipmentsListToDisplay] = useState();

  const query = new URLSearchParams(useLocation().search);
  const situation = query.get("situation");
  const userId = query.get("userid");
  
  useEffect(() => {

    const url = situation
      ? `equipment/find_situation/${situation}`
      : "equipment/index";

    api
      .get(url)
      .then((equipment) => {
        var equipments = equipment.data.equipment;
        setEquipmentsOriginal(equipments);
        setEquipmentsListToDisplay(equipments);
        setLoading((prev) => ({ ...prev, equipments: false }));
      })
      .catch((err) => {
        console.error(
          "Não foi possivel estabelecer conexão com o backend",
          err
        );
      });

    api
      .get(`/model/index`)
      .then((model) => {
        setModelList(model.data.data);
        setLoading((prev) => ({ ...prev, model: false }));
      })
      .catch((err) => {
        console.error(
          "Não foi possivel estabelecer conexão com o backend",
          err
        );
      });

  }, [situation]);

  useEffect(() => {

    setEquipmentsOriginal((velhosEquip) => {

      return velhosEquip.map((equipment) => {
        if (modelList[0].id) {

          // equipment.equipment_model = modelList.find(
          //   (model) => model.id === equipment.id_model
          // ).modelName;

          const selected = modelList.find(
            (model) => model.id === equipment.id_model
          );

          if (selected) {
            equipment.equipment_model = selected.modelName;
          }

        }

        return equipment;
      });
    });

    setLoading((prev) => ({ ...prev, changeNameModel: false }));
  }, [modelList]);

  useEffect(() => {

    setEquipmentsListToDisplay(equipmentsOriginal);
    setLoading((prev) => ({ ...prev, setDisplay: false }));

  }, [equipmentsOriginal]);

  useEffect (()=>{
    async function getEquipmentsByUser(){
      if(userId){
      await api.get(`/user/${userId}`).then((response)=>{
        const idEquipments = response.data.user.id_equipments;
        let auxVector = [];
        if(idEquipments){
          equipmentsOriginal.forEach((equipment)=>{
            if(idEquipments.includes(equipment.id)){
              auxVector.push(equipment);
            }
          })
        }
        setEquipmentsListToDisplay(auxVector);
      })
      }
    }
    getEquipmentsByUser();

  },
  [equipmentsOriginal]
   )
  //  useEffect (()=>{
  //   async function getUserByEquipment(){
  //     if(idEquipments){
  //     await api.get(`/equipment/${idEquipments}`).then((response)=>{
  //       const userId = response.data.user.id;
  //     })
  //     }
  //   }
  //   getUserByEquipment();

  // },
  // []
  //  )
  function FindEquipment(searchEquipment) {
      
    // if(userId){
    //   equipmentsOriginal.forEach((item)=> {
        
    //   })
    // }





    if (searchEquipment.length > 0) {

      const equipmentsListToDisplay = [];
      const filteredEquipment = new RegExp(searchEquipment.toLowerCase(), "g");

      equipmentsOriginal.forEach((item) => {
        var probable = item[filterby].toLowerCase().match(filteredEquipment);
        if (probable) {
          equipmentsListToDisplay.push(item);
        }
      });

      setEquipmentsListToDisplay(equipmentsListToDisplay);
    } else {
      setEquipmentsListToDisplay(equipmentsOriginal);
    }
  }

  function getRequiredDateFormat(timeStamp, format = "DD/MM/YYYY") {
    return moment(timeStamp).format(format);
  }

  if (
    loading.model ||
    loading.equipments ||
    loading.changeNameModel ||
    loading.setDisplay
  ) {
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
      <div className={classes.root}>
        <div className={classes.header}>
          <Typography variant="h3" className={classes.title}>
            Equipamentos
          </Typography>
          <Button
            component={Link}
            to="/cadastroequipamento"
            className={classes.buttonAdd}
          >
            Adicionar Novo
          </Button>
        </div>
        
        <div className={classes.searchplusfilter}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div className={classes.searchInput}>
              <InputBase
                className={classes.placeholder}
                placeholder="Procurar equipamento"
                onChange={(e) => FindEquipment(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.input,
                }}
              />
            </div>
          </div>
          <FormControl className={classes.filter}>
            <Select
              className={classes.selectItens}
              value={filterby}
              onChange={(e) => setFilterby(e.target.value)}
              variant="outlined"
            >
              {/* <MenuItem value="cpf_client">Cliente</MenuItem> */}
              <MenuItem value="id_model">Modelo</MenuItem>
              <MenuItem value="equipment_code">Código do Equipamento</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className={classes.table}>
          <StickyHeadTable
            equipmentsListToDisplay={ordenar(
              equipmentsListToDisplay,
              ordem.by,
              ordem.alfabetica,
              ordem.by === "updateAt" ? true : false
            ).map((equipment) => {
              var formattedDate = getRequiredDateFormat(equipment.updatedAt);
              return {
                id: equipment.id,
                equipment_code: equipment.equipment_code,
                id_model: equipment.id_model,
                cpf_client: "", // inicialmente fica vazia
                updatedAt: formattedDate,
              };
            })}
            setOrdem={setOrdem}
            ordem={ordem}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
