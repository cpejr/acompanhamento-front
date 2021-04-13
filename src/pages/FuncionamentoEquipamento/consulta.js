import api from '../../services/api'


api.verbo('rota').then(resposta =>
  // codigo para manipular dados (resposta.data.model)
  // get ->  guarda em state !!!usem dentro de useEffect!!!!
  // geralmente o axios vai ficar dentro de uma handleSubmit 
).catch(err => console(err))

// rota: rota (não precisa do começo)
// verbo: get post put delete

const dados = {
  "model": {
    "manufacturer": "Extreme Water",
    "currentLimit": 12,
    "voltageLimit": 110.8,
    "updatedAt": "2020-09-23T21:37:15.476Z",
    "releaseYear": "2015",
    "createdAt": "2020-09-23T21:37:15.476Z",
    "temperatureLimit": 29,
    "id": "f2b37740-fde4-11ea-bd60-f7411086f889",
    "modelName": "Bomba 3000 extreme",
    "type": "Bomba Hidráulica"
  }
}

// 1 -> get >> console.log()
// 2 -> colocar o id certo
// 3 -> dados >> useStates()
// 4 -> filtrar os dados com o selectedChart (concatenar a string com Limit)
// 5 -> jogar no gráfico
