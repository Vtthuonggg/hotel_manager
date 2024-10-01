import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import store from "../components/store/store.js";
export const getListRoom = async () => {
  const accountId = store.state.accountId;
  console.log("accountIdSSSSSSSSSSSSSSSSSSSS", accountId);
  try {
    const response = await axios.get(`${BASE_URL}room/getlistt`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { id: accountId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getRoomInfo = async (roomId) => {
  const accountId = store.state.accountId;
  try {
    const response = await axios.get(`${BASE_URL}room/${roomId}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { id: accountId },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateRoom = async (roomId, data) => {
  try {
    const response = await axios.put(
      `${BASE_URL}room/updateroom/${roomId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const createRoom = async (data) => {
  const accountId = store.state.accountId;
  data.idAccount = accountId;
  try {
    const response = await axios.post(`${BASE_URL}room/addroom`, data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteRoom = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}room/deleteroom/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
