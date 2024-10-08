import axios from "axios";

import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";

export const createOrder = async (data) => {
  const accountId = Cookies.get("accountId");
  data.idAccount = accountId;
  try {
    const response = await axios.post(`${BASE_URL}booking/add`, data);
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const updateOrder = async (data, id) => {
  const accountId = Cookies.get("accountId");
  data.idAccount = accountId;
  try {
    const response = await axios.put(`${BASE_URL}booking/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteOrder = async (id) => {

  try {
    const response = await axios.delete(`${BASE_URL}booking/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getListOrder = async () => {
  const accountId = Cookies.get("accountId");
  try {
    const response = await axios.get(`${BASE_URL}booking/getlist`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};

export const getOrderInfo = async (idBooking) => {
  const accountId = Cookies.get("accountId");

  try {
    const response = await axios.get(`${BASE_URL}booking/getbooking`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId, idBooking: idBooking },
    });
    return response.data;
  } catch (error) {
    console.error(error);

    throw error;
  }
};
