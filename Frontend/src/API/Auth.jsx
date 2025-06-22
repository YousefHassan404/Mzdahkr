import { jwtDecode } from "jwt-decode";
const key = "token";


const setToken = (token) => localStorage.setItem(key, token);
const deleteToken = () => localStorage.removeItem(key);
const getToken = () => localStorage.getItem(key);
const getUser = () => {
  try {
    const token = getToken();
    return token ? jwtDecode(token) : null;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const authApi = { setToken, deleteToken, getToken, getUser };

export default authApi;
