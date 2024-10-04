import axios from "axios";
import { BASE_URL } from "./BASE_URL";
import Cookies from "js-cookie";

export const getReport = async () => {
  const accountId = Cookies.get("accountId");
  try {
    const response = await axios.get(`${BASE_URL}booking/report`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
      params: { idAccount: accountId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
