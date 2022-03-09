import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://ytfavour.herokuapp.com/api/',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    credentials: 'include',
});
  
export default instance;