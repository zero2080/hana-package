import axios from 'axios';

const API_PATH = process.env.REACT_APP_API_PATH;

const login = (user) => {
  return axios.post(`${API_PATH}/admin/authenticate`, user).then((resp) =>{
      sessionStorage.setItem('accessToken', resp.data.accessToken);
      return true;
  }).catch(e=>{
    return false;
  });
}

export default login;