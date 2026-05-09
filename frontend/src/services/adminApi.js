import axios from "axios";

const API = "http://localhost:4000/api/admin";

export const getDashboardStats = async () => {
  return axios.get(`${API}/dashboard`);
};

export const getUsers = async () => {
  return axios.get(`${API}/users`);
};

export const getStores = async () => {
  return axios.get(`${API}/stores`);
};

export const addUser = async (data) => {
  return axios.post(`${API}/add-user`, data);
};

export const addStore = async (data) => {
  return axios.post(`${API}/add-store`, data);
};