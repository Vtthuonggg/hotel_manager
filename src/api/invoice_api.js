import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";

export const getBillInfo = async (idBooking) => {
  const accountId = Cookies.get("accountId");
  try {
    const response = await axios.get(`${BASE_URL}bill`, {
      params: { idAccount: accountId, idBooking: idBooking },
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getListBill = async () => {
  const accountId = Cookies.get("accountId");
  try {
    const response = await axios.get(`${BASE_URL}bill/list`, {
      params: { idAccount: accountId },
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateBill = async (id) => {
  const accountId = Cookies.get("accountId");

  try {
    const response = await axios.put(`${BASE_URL}update/bill/${id}`, {
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addServiceBill = async (data) => {
  const accountId = Cookies.get("accountId");
  data.idAccount = accountId;
  try {
    const response = await axios.post(`${BASE_URL}bill/addservice`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const updateServiceBill = async (data) => {
  const accountId = Cookies.get("accountId");
  data.idAccount = accountId;
  try {
    const response = await axios.put(`${BASE_URL}bill/addservice`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
