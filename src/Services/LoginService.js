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
    console.log("service", data);
    return http.post("userlogin/email_verification", data);
  }
  // verifyEmailToken(data) {
  //   return http.post("staffs/verify_email", data, {
  //     headers: {
  //       authtoken: httpToken,
  //     },
  //   });
  // }
  // setUpCompany(data) {
  //   return http.post("customers/data/", data, {
  //     headers: {
  //       authtoken: httpToken,
  //     },
  //   });
  // }

  // updateCareerInformation(data) {
  //   return http.post(`staffs/career_info`, data, {
  //     headers: {
  //       authtoken: httpToken,
  //     },
  //   });
  // }

  //   delete(id) {
  //     return http.delete(`/posts/${id}`);
  //   }

  //   deleteAll() {
  //     return http.delete(`/tutorials`);
  //   }

  //   findByTitle(title) {
  //     return http.get(`/tutorials?title=${title}`);
  //   }
}

export default new LoginService();
