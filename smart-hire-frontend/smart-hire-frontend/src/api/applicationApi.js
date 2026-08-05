import axios from "axios";

const applicationApi = axios.create({
  baseURL: import.meta.env.VITE_APPLICATION_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default applicationApi;