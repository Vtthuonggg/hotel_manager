import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./BASE_URL";
const accountId = Cookies.get("accountId");

export const getBillInfo = async () => {
  try {
    const response = await axios.post(`${BASE_URL}bill`, {
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateBill = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}update/bill/${id}`, {
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addServiceBill = async () => {
  try {
    const response = await axios.post(`${BASE_URL}bill/addservice`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
