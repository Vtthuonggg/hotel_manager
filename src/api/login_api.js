import axios from "axios";
import { BASE_URL } from "./BASE_URL";

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}staff/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}account/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Register error:", error);
    throw error;
  }
};
