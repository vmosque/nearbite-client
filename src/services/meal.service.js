import axios from "axios";

const API_URL = "http://localhost:5005/api/meals";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const getMeals = () => {
  return axios.get(API_URL);
};

export const createMeal = (mealData) => {
  return axios.post(API_URL, mealData, {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });
};
