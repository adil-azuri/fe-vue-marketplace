import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 12000,
});

export default api;

const BASE_URL = "http://127.0.0.1:8000";
export const IMAGE_URL = `${BASE_URL}/storage`;
