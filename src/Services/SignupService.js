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

  checkCareerInfo(data) {
    return http.post(`staffs/is_career_information_setup`, data);
  }

  checkCompany(data) {
    return http.post(`staffs/is_company_setup`, data);
  }
  // Personal Details get
  updatePersonalDetails(data) {
    return http.post("staffs/update_personal_account", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  // Personal Details update
  getPersonalDetails(data) {
    console.log("personal details", data);
    return http.post(
      "staffs/staff_by_token",
      { auth_token: data.auth_token },
      {
        headers: {
          "X-Company": localStorage.getItem("selected_company"),
          "X-Year": localStorage.getItem("selected_year"),
        },
      }
    );
  }
}

export default new SignupService();
