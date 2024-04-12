import axios from "axios";
import config from "../config";

export const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${config.backend.url}/auth/login`,
      {
        username,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(
      `${config.backend.url}/auth/register`,
      {
        username,
        password,
      }
    );
    return data;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    throw error;
  }
};
