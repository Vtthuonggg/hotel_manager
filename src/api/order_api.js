import axios from "axios";

import { BASE_URL } from "./BASE_URL";
import store from "../components/store/store.js";

export const createOrder = async (data) => {
  const accountId = store.state.accountId;
  data.idAccount = accountId;
  console.log(data);
  try {
    const response = await axios.post(`${BASE_URL}booking/add`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateOrder = async (data, id) => {
  const accountId = store.state.accountId;
  data.idAccount = accountId;
  console.log(data);
  try {
    const response = await axios.put(`${BASE_URL}booking/update/${id}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getListOrder = async () => {
  const accountId = store.state.accountId;
  try {
    const response = await axios.get(`${BASE_URL}booking/getlist`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getOrderInfo = async (idBooking) => {
  const accountId = store.state.accountId;

  try {
    const response = await axios.get(`${BASE_URL}booking/getbooking`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId, idBooking: idBooking },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
