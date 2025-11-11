import axios from 'axios';

export function getApi() {
  const baseURL = localStorage.getItem("backendUrl") || "http://localhost:3000";
  return axios.create({ baseURL });
}
