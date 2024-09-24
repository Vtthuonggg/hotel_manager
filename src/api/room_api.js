import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL } from "./BASE_URL";
export const getListRoom = async () => {
  const accountId = Cookies.get("accountId");
  console.log(accountId);
  try {
    const response = await axios.get(`${BASE_URL}room/getlistt`, {
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
