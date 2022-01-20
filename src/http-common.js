import axios from "axios";
import nProgress from "nprogress";

const languages = { en: "english", de: "german" };
const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiYWRtaW4iLCJuYW1lIjoiYXV0aHRva2VuIiwiQVBJX1RJTUUiOjE2Mzg4NzUwODV9.9BzLMUun6GW9EwmDhkP1Kxnz7mg-JebGshSeErpMcxg";
const instance = axios.create({
  baseURL: "https://stagingcrm.morethandigital.info/api/",
  headers: {
    authtoken: apiToken,
    "Host": "https://stagingcrm.morethandigital.info",
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
