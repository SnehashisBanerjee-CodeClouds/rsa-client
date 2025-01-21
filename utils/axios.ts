import axios, { AxiosError, AxiosInstance } from "axios";
// console.log(process.env.API_BASE);
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Add your authorization token or modify the request as needed
    config.headers["Content-Type"] = "application/json";
    config.headers.set("token", process.env.NEXT_PUBLIC_AUTH_TOKEN);

    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default axiosInstance;
