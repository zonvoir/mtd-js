import http from "@/http-common";

// let headers = {"Access-Control-Allow-Origin,"}
class CompanyService {
  invitationByFile(data) {
    return http.post("invitation/send_invitation_file", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  invitationByEmails(data) {
    return http.post("invitation/send_invitation", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  companiesList(data) {
    return http.post("customers/staff_company", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  companyDetails() {
    return http.get("customers/company_detail", {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  departmentsByToken(data) {
    return http.post("customers/staff_department_by_company", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  memberByRoleId(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  memberByDepartments(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  memberByCategories(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  getYears() {
    return http.get("lists/years");
  }
}
export default new CompanyService();
