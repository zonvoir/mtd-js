import axios from "axios";
const apiToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoicmFnaHZlbmRyYSIsIm5hbWUiOiJjaGF5dWRoYXJ5IiwiQVBJX1RJTUUiOjE2MzIyMTY1MDN9.xQCikbSWKG8_xfIOMsZ7puyXcmhj3Y9Vg7nNT4C26gI";
export default axios.create({
  baseURL: "https://zonvoirdemo.in/codecadda/api/",
  headers: {
    authtoken: apiToken,
    "Content-type": "application/json",
  },
});
