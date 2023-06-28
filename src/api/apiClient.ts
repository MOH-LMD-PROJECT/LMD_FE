import axios from "axios";

const apiClient = axios.create({
	baseURL: "http://clims/public/api",
});

export default apiClient;
