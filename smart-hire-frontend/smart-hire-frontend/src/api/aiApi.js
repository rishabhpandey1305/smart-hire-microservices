import axios from "axios";
import { setupInterceptors } from "./setupInterceptors";

const aiApi = axios.create({
  baseURL: import.meta.env.VITE_AI_API,
});

setupInterceptors(aiApi);

export default aiApi;