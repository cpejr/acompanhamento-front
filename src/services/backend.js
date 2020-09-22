import models from './Datas/models';
import equipments from './Datas/equipments';

// Models promise prototic
const getModels = () => {
  return new Promise((resolve, reject) => {
    if (models) resolve(models);
    else reject({ message: "Error in importing models", errorData: models });
  })
};

// Equipments promise prototic
const getEquipments = () => {
  const get = new Promise((resolve, reject) => {
    if (equipments) resolve(equipments);
    else reject({ message: "Error in importing equipments", errorData: equipments });
  })
  return get;
};

export default {
  getModels,
  getEquipments,
}
