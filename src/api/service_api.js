import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfxdq0iwq/image/upload";
const UPLOAD_PRESET = "wcayf2ib";

export const createService = async (data) => {
  const accountId = Cookies.get("accountId");
  data.idAccount = accountId;
  try {
    const response = await axios.post(`${BASE_URL}service/add`, data, {
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getListService = async () => {
  const accountId = Cookies.get("accountId");
  // console.log("accountId", accountId);
  try {
    const response = await axios.get(`${BASE_URL}service/getlist`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getServiceInfo = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}service/${id}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const updateService = async (data, id) => {
  try {
    const response = await axios.put(`${BASE_URL}service/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const deleteeService = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}service/delete/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  try {
    const response = await axios.post(CLOUDINARY_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.secure_url;
  } catch (error) {
    console.error(
      "Error uploading image:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
