import axios from "axios";

const API = import.meta.env.BASE_URL || "http://localhost:4000/api";

export const getStores =
  async () => {

    return axios.get(
      `${API}/stores`
    );
  };

export const submitStoreRating =
  async (data) => {

    return axios.post(
      `${API}/ratings`,
      data
    );
  };

export const updateUserPassword =
  async (data) => {

    return axios.put(
      `${API}/auth/update-password`,
      data
    );
  };