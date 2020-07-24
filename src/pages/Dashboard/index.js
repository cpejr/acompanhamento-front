import Dashboard from './dashboard'

export default Dashboard;

// { //dataSchema
//   id: { type: String, hashKey: true },
//   id_equipment: {type: String, required: true},
//   temperature: { type: Number, required: true },
//   voltage: { type: Number, required: true },
//   current: { type: Number, required: true},
// },
// { timestamps: true }

// ==========================================================

// { //modelSchema
//   id: { type: String, hashKey: true },
//   modelName: { type: String, required: true },
//   type: { type: String, required: true },
//   manufacturer: { type: String, required: true },
//   releaseYear: { type: String, required: true },
//   temperatureLimit: { type: Number, required: true }, 
//   currentLimit: { type: Number, required: true },
//   voltageLimit: { type: Number, required: true },
// },
// { timestamps: true }

// ==========================================================

// // http://localhost:3333/data/index
// { // Resposta:
//   "data": [
//     {
//       "current": 8,
//       "updatedAt": "2020-06-23T21:28:27.465Z",
//       "createdAt": "2020-06-23T21:28:27.465Z",
//       "id": "79ff1c80-b598-11ea-b8ae-d72453e3e36d",
//       "temperature": 37,
//       "voltage": 127.8
//     }
//   ]
// }
