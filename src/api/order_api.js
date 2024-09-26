import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./BASE_URL";
const accountId = Cookies.get("accountId");

export const createOrder = async (data) => {
  data.idAccount = accountId;
  try {
    const response = await axios.post(`${BASE_URL}booking/add`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateOrder = async (data, id) => {
  try {
    const response = await axios.put(`${BASE_URL}booking/update/${id}`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getListOrder = async () => {
  try {
    const response = await axios.get(`${BASE_URL}booking/getlist`, {
      params: { idAccount: accountId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderInfo = async (idBooking) => {
  try {
    const response = await axios.get(`${BASE_URL}booking/getbooking`, {
      params: { idAccount: accountId, idBooking: idBooking },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
