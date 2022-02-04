import axios from "axios";
import nProgress from "nprogress";

const languages = { en: "english", de: "german" };
// const apiToken = process.env.VUE_API_KEY;
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    authtoken: process.env.VUE_APP_API_KEY,
    "Content-type": "application/json",
    // company: localStorage.getItem("selected_company"),
    // year: localStorage.getItem("selected_year"),
    "Accept-Language": localStorage.getItem("language")
      ? languages[localStorage.getItem("language")]
      : "english",
  },
});

// before a request is made start the nprogress

instance.interceptors.request.use((config) => {
  nProgress.start();
  return config;
});

// before a response is returned stop nprogress
instance.interceptors.response.use((response) => {
  nProgress.done();
  return response;
});

export default instance;
