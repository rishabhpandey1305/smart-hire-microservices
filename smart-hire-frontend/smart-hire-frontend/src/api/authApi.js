import axios from "axios";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default authApi;