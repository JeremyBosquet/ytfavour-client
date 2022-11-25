import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://eager-pumps-deer.cyclic.app/api/videos/',
    headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
    credentials: 'include',
});
  
export default instance;