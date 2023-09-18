import axios from "axios";

const axiosInstance = (tokenName : string) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem(tokenName);
    request.headers.Authorization = `Bearer ${token}`;
    return request;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error.response.data)
  );

  return instance;
};

export default axiosInstance;
