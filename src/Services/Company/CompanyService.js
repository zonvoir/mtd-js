import http from "@/http-common";
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
  usersAllCompanies(data) {
    return http.post("userlogin/invited_user_companies", data);
  }
  getInvitationByRole(data) {
    return http.post("roles/get_roles", data, {
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
    console.log("all words", data);
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
  memberByWord(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  setMemberPermission(data) {
    return http.post("staffs/member_permissions", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  updateMemberPermission(data) {
    return http.post("staffs/update_member_permissions", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  filterMemberPermission(data) {
    return http.post("staffs/member_permissions_filter", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  getYears() {
    return http.get("lists/years");
  }
  acceptInvitation(data) {
    return http.post("invitation/accept_invitation", data);
  }
}
export default new CompanyService();
