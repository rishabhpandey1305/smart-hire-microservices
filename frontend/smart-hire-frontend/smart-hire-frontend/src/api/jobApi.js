import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";

const jobApi = axios.create({
  baseURL: import.meta.env.VITE_JOB_API,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(jobApi);

export default jobApi;