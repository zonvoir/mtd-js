import http from "@/http-common";

// let headers = {"Access-Control-Allow-Origin,"}
class SignupService {
  getAll() {
    return http.get("lists");
  }

  create(data) {
    return http.post("staffs/data/", data);
  }
  verifyEmailToken(data) {
    return http.post("staffs/verify_email", data);
  }
  setUpCompany(data) {
    return http.post("customers/data/", data);
  }

  updateCareerInformation(data) {
    return http.post(`staffs/career_info`, data);
  }

  checkCareerInformation(data) {
    return http.post(`staffs/is_career_information_setup`, data);
  }

  checkCompany(data) {
    return http.post(`staffs/is_company_setup`, data);
  }
  // Personal Details get
  updatePersonalDetails(data) {
    return http.post("staffs/update_personal_account", data);
  }
  // Personal Details update
  getPersonalDetails(data) {
    return http.post("staffs/staff_by_token", { auth_token: data.auth_token });
  }
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

export default new SignupService();
