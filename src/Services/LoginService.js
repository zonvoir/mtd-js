import http from "@/http-common";

// let headers = {"Access-Control-Allow-Origin,"}
class LoginService {
  getAll() {
    return http.get("lists");
  }

  verifyOTP(data) {
    return http.post("userlogin/otp_verification", data);
  }
  createLogin(data) {
    return http.post("userlogin/login", data);
  }
  emailVerifcationLogin(data) {
    // console.log("service", data);
    return http.post("userlogin/email_verification", data);
  }
}

export default new LoginService();
