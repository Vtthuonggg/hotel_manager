import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";

export const getBillInfo = async (idBooking) => {
  const accountId = Cookies.get("accountId");
  try {
    const response = await axios.post(`${BASE_URL}bill`, {
      params: { idAccount: accountId, idBooking: idBooking },
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
  //idBooking, idService, quantity`
  try {
    const response = await axios.post(`${BASE_URL}bill/addservice`, data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
