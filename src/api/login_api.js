import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";
const accountId = Cookies.get("accountId");
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

export const getAccountInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}account/${accountId}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateAccountInfo = async (data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}account/update/${accountId}`,
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
