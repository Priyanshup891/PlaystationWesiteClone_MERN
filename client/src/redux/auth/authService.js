import axios from "axios";

const HTTP_URL = "http://localhost:8800/api/auth";

const register = async (userData) => {
  try {
    const response = await axios.post(`${HTTP_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(`${HTTP_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const authService = { register, login };
export default authService;
