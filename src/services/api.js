import axios from 'axios'

const api = axios.create({
  // baseURL: 'http://bombastesteback.herokuapp.com' //Inserir a URL do backend
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3333/' //Inserir a URL do backend
})

export default api
