import axios from "axios";

const jobApi = axios.create({
  baseURL: import.meta.env.VITE_JOB_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default jobApi;