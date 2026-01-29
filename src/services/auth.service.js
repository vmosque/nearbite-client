import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const login = (credentials) => {
  return axios.post(`${API_URL}/auth/login`, credentials);
};

const signup = (userData) => {
  return axios.post(`${API_URL}/auth/signup`, userData);
};

const authService = {
  login,
  signup,
};

export default authService;
