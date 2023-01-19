import axios from "axios";

const BASE_URL = "http://localhost:3001/api/auth";

export const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
