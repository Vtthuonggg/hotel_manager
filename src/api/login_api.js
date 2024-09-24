import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}account/login`, {
      email: username,
      password: password,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}account/register`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
