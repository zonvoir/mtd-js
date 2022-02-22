import http from "@/http-common";
class CompanyService {
  // invitaion list
  // send invitaion by csv file
  invitationByFile(data) {
    return http.post("invitation/send_invitation_file", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // send invitaion as array of emails
  invitationByEmails(data) {
    return http.post("invitation/send_invitation", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // accept invitaion
  acceptInvitation(data) {
    return http.post("invitation/accept_invitation", data);
  }

  // delete invation
  deleleInvitation(data) {
    return http.post("invitation/delete_invitation", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // get invitation by roles
  getInvitationByRole(data) {
    return http.post("roles/get_roles", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // invitation ends

  // list of companies in system
  usersAllCompanies(data) {
    return http.post("userlogin/invited_user_companies", data);
  }

  // company auto complete
  companySuggestions() {
    return http.get("customers/data_suggestion");
  }

  // staff company list
  companiesList(data) {
    return http.post("customers/staff_company", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // company list
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
  // members service
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
  // permission
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
}
export default new CompanyService();
