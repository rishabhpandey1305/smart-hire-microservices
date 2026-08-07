import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";

const candidateApi = axios.create({
  baseURL: import.meta.env.VITE_CANDIDATE_API,
});

setupInterceptors(candidateApi);

export default candidateApi;