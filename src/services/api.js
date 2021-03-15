import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bombastesteback.herokuapp.com/' //Inserir a URL do backend
})

export default api
