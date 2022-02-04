import axios from "axios";
import nProgress from "nprogress";

const languages = { en: "english", de: "german" };
<<<<<<< HEAD
// const apiToken = process.env.VUE_API_KEY;
=======
const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJuYW1lIjoiYXV0aHRva2VuIiwiQVBJX1RJTUUiOjE2Mzg4NzUwODV9.9BzLMUun6GW9EwmDhkP1Kxnz7mg-JebGshSeErpMcxg";
>>>>>>> 88fbd7d21daa5068a23daee977aa6530f0f70e0b
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
<<<<<<< HEAD
    authtoken: process.env.VUE_APP_API_KEY,
=======
    authtoken: apiToken,
    "Host": "https://stagingcrm.morethandigital.info",
>>>>>>> 88fbd7d21daa5068a23daee977aa6530f0f70e0b
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
