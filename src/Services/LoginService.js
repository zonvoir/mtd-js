import http from "@/http-common";

// let headers = {"Access-Control-Allow-Origin,"}
class LoginService {
  getAll() {
    return http.get("lists");
  }

  verifyOTP(data) {
    return http.post("userlogin/otp_verification", data);
  }

  registrationOTPVerification(data) {
    return http.post("customers/verify_two_factor", data);
  }

  // Edit Email on Register
  editEmailOnRegister(data) {
    return http.post("customers/edit_email_register", data);
  }

  createLogin(data) {
    return http.post("userlogin/login", data);
  }

  forgotPassword(data) {
    return http.post("userlogin/forgot_password_user", data);
  }
  resetPassword(data) {
    return http.post("userlogin/forgot_password_reset", data);
  }

  emailVerifcationLogin(data) {
    // console.log("service", data);
    return http.post("userlogin/email_verification", data);
  }
}

export default new LoginService();
