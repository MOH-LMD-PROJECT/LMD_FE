import axios from 'axios';

const baseURL = 'https://codezoneug.com/clims_backend/clims/public/api';

interface loginData {
  username: string;
  password: string;
}

interface hotspotData {
  hotspot_name: string;
  contact_person_name: string;
  contact_person_telephone: string;
  latitude: number | undefined;
  longtitude: number | undefined;
  organization_unit_id: number | undefined;
  hotspot_status: string;
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

const addCondoms = (data: any) => {
  return axios.post(`${baseURL}/condoms`, data).then((res) => res.data);
};

const updateCondomItem = (data: any, id: string) => {
  return axios.patch(`${baseURL}/condoms/${id}`, data).then((res) => res.data);
};

const updateUser = (
  {
    username,
    password,
    firstname,
    lastname,
    email,
    role,
    organization_unit_id,
    location,
    phone_number,
  }: userData,
  id: string
) => {
  return axios
    .put(`${baseURL}/users/${id}`, {
      username,
      password,
      firstname,
      lastname,
      email,
      role,
      organization_unit_id,
      location,
      phone_number,
    })
    .then((res) => res.data);
};

const deleteCondom = (id: any) => {
  console.log(id);
  return axios.delete(`${baseURL}/condoms/${id}`).then((res) => res.data);
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
  // const data = JSON.parse(localStorage.getItem('userData'));
  // console.log(data.token);
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
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${data.token}`, // Add the token to the Authorization header
      //   },
      // }
    )
    .then((res) => res.data);
};

const createHotspot = ({
  hotspot_name,
  contact_person_name,
  contact_person_telephone,
  latitude,
  longtitude,
  organization_unit_id,
  hotspot_status,
}: hotspotData) => {
  //@ts-ignore
  // const data = JSON.parse(localStorage.getItem('userData'));
  // console.log(data.token);
  return axios
    .post(
      `${baseURL}/hotSpots`,
      {
        hotspot_name,
        contact_person_name,
        contact_person_telephone,
        latitude,
        longtitude,
        organization_unit_id,
        hotspot_status,
      }
      // {
      //   headers: {
      //     Authorization: `Bearer ${data.token}`, // Add the token to the Authorization header
      //   },
      // }
    )
    .then((res) => res.data);
};

const getUsers = () => {
  return axios.get(`${baseURL}/users`).then((res) => res.data);
};

const getRoles = () => {
  return axios.get(`${baseURL}/roles`).then((res) => res.data);
};

const getCondoms = () => {
  return axios.get(`${baseURL}/condoms`).then((res) => res.data);
};

const getCondomInventory = () => {
  return axios.get(`${baseURL}/condomInventories`).then((res) => res.data);
};

const addCondomInventory = (data: any) => {
  return axios
    .post(`${baseURL}/condomInventories`, data)
    .then((res) => res.data);
};

const getInventory = (id: string) => {
  return axios
    .get(`${baseURL}/condomInventories/${id}`)
    .then((res) => res.data);
};

const deleteCondomInventory = (id: string) => {
  return axios
    .delete(`${baseURL}/condomInventories/${id}`)
    .then((res) => res.data);
};

const deleteUser = (id: string) => {
  return axios.delete(`${baseURL}/users/${id}`).then((res) => res.data);
};

const deleteHotspot = (id: string) => {
  return axios.delete(`${baseURL}/hotSpots/${id}`).then((res) => res.data);
};

const updateCondomInventory = ({ data, id }: any) => {
  return axios
    .put(`${baseURL}/condomInventories/${id}`, data)
    .then((res) => res.data);
};

const getUnits = () => {
  return axios.get(`${baseURL}/unitOfMeasures`).then((res) => res.data);
};

const getOrganizations = () => {
  return axios.get(`${baseURL}/organizationUnits`).then((res) => res.data);
};

const getHotspots = () => {
  return axios.get(`${baseURL}/hotSpots`).then((res) => res.data);
};

export {
  loginUser,
  createUser,
  getUsers,
  getCondoms,
  getUnits,
  addCondoms,
  deleteCondom,
  getRoles,
  getOrganizations,
  createHotspot,
  getCondomInventory,
  updateCondomItem,
  addCondomInventory,
  deleteCondomInventory,
  getHotspots,
  updateCondomInventory,
  deleteUser,
  deleteHotspot,
  updateUser,
};
