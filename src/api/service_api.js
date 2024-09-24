import axios from "axios";
import { BASE_URL } from "./BASE_URL";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dfxdq0iwq/image/upload";
const UPLOAD_PRESET = "wcayf2ib";
export const createService = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}service/add`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getListService = async () => {
  try {
    const response = await axios.get(`${BASE_URL}service/list`, {
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
