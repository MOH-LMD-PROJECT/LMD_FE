import axios from 'axios';
import apiClient from '../apiClient';

const baseURL = 'https://covid19.gou.go.ug/clims_backend/public/api';

interface loginData {
  username: string;
  password: string;
}

interface userData {
  username: string;
  firstname: string;
  lastname: string;
  password: string;
  email: string;
  role: string;
  organization_unit_id: string;
  location: string;
  phone_number: string;
}

const loginUser = ({ username, password }: loginData) => {
  return axios
    .post(`${baseURL}/login`, {
      username,
      password,
    })
    .then((res) => res.data);
};

const createUser = ({
  username,
  password,
  firstname,
  lastname,
  email,
  role,
  organization_unit_id,
  location,
  phone_number,
}: userData) => {
  //@ts-ignore
  const data = JSON.parse(localStorage.getItem('userData'));
  console.log(data.token);
  return axios
    .post(
      `${baseURL}/users`,
      {
        username,
        firstname,
        lastname,
        password,
        email,
        role,
        organization_unit_id,
        location,
        phone_number,
      },
      {
        headers: {
          Authorization: `Bearer ${data.token}`, // Add the token to the Authorization header
        },
      }
    )
    .then((res) => res.data);
};

const getUsers = () => {
  return axios.get('/users').then((res) => res.data);
};

export { loginUser, createUser, getUsers };
