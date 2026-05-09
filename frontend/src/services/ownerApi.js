import axios from "axios";

const API = import.meta.env.BASE_URL || 'http://localhost:4000/api';

export const getOwnerDashboard =
  async (token) => {

    return axios.get(
      `${API}/stores/owner/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

export const updateOwnerPassword =
  async (data, token) => {

    return axios.put(
      `${API}/auth/update-password`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };