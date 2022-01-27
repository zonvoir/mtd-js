import axios from "axios";
import nProgress from "nprogress";

const languages = { en: "english", de: "german" };
const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoicmFnaHZlbmRyYSIsIm5hbWUiOiJjaGF5dWRoYXJ5IiwiQVBJX1RJTUUiOjE2MzIyMTY1MDN9.xQCikbSWKG8_xfIOMsZ7puyXcmhj3Y9Vg7nNT4C26gI";
const instance = axios.create({
  baseURL: "https://zonvoirdemo.in/codecadda/api/",
  headers: {
    authtoken: apiToken,
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
