import axios from "axios";
import config from "../config";

export const loginUser = async (username: string, password: string, onLogin: (username: string) => void) => {
  try {
    const { data } = await axios.post(
      `${config.backend.url}/auth/login`,
      {
        username,
        password,
      }
    );
    console.log("User logged in successfully!");
    document.cookie = `token=${data.token}; Secure; SameSite=Strict`;
    sessionStorage.setItem("username", username);
    onLogin(username);
  } catch (error) {
    console.error("An error occurred during login:", error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string, onRegister: (username: string) => void) => {
  try {
    const { data } = await axios.post(
      `${config.backend.url}/auth/register`,
      {
        username,
        password,
      }
    );
    console.log("User registered successfully!");
    sessionStorage.setItem("username", username);
    onRegister(username);
    console.log(data.token);
    document.cookie = `token=${data.token}; Secure; SameSite=Strict`;
  } catch (error) {
    console.error("An error occurred during registration:", error);
    throw error;
  }
};
