import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import store from "../components/store/store.js";
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}account/login`, {
      email: `${username}@gmail.com`,
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
  const accountId = store.state.accountId;
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
  const accountId = store.state.accountId;
  console.log(data);
  try {
    const response = await axios.put(
      `${BASE_URL}account/update/${accountId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
