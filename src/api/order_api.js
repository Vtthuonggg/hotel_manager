import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const createOrder = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}booking/add`, data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
