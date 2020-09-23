import models from './Datas/models';
import equipments from './Datas/equipments';
import clients from './Datas/peoples';

// Models promise prototic
const getModels = () => {
  return new Promise((resolve, reject) => {
    if (models) resolve(models);
    else reject({ message: "Error in importing models", errorData: models });
  })
};

// Equipments promise prototic
const getEquipments = () => {
  return new Promise((resolve, reject) => {
    if (equipments) resolve(equipments);
    else reject({ message: "Error in importing equipments", errorData: equipments });
  })
};

// Peoples promise prototic
const getClients = () => {
  return new Promise((resolve, reject) => {
    if (clients) resolve(clients);
    else reject({ message: "Error in importing clients", errorData: clients });
  })
};

export default {
  getModels,
  getEquipments,
  getClients
}
