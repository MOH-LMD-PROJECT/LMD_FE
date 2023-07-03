import axios from 'axios';

const baseURL = 'https://covid19.gou.go.ug/clims_backend/public/api';

interface loginData {
  username: string;
  password: string;
}
export function loginUser({ username, password }: loginData) {
  return axios
    .post(`${baseURL}/login`, {
      username,
      password,
    })
    .then((res) => res.data);
}
