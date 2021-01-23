import axios from "axios";
import { getCookie } from "./cookies";

// creating axios instance
export const axiosInstance = axios.create({
  baseURL: "http://localhost:6700/",
  // baseURL: "http://65.0.72.225:5000/api/",
  // baseURL: "https://cors-anywhere.herokuapp.com/http://65.0.72.225:5000",
  // baseURL: "http://localhost:5000",
});

// setting token in header for each request
axiosInstance.interceptors.request.use(
  (config) => {
    let token = getCookie("token"); // getting token from cookies
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// configuration to get upload progress(in percentage)

export var withUploadProgress = (callBack) => {
  return {
    onUploadProgress: function (progressEvent) {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      callBack(percentCompleted);
    },
  };
};
