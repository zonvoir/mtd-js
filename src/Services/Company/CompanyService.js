import http from "@/http-common";
class CompanyService {
  // invitaion list default
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

  // inivite team List
  getInvitedTeamManagenet(data) {
    return http.post("roles/get_team_management", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // inivite a new  team member
  inviteNewTeamMember(data) {
    return http.post("invitation/send_invitation_team", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // invite bulk list of new  team member import file
  inviteTeamMemberByList(data) {
    return http.post("invitation/send_invitation_team_file", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // inivite bulk list of confirmed  team member
  confirmedTeamMemberByList(data) {
    return http.post("invitation/send_invitation_team_file_confirm", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // Remove a team member
  removeTeamMember(data) {
    return http.post("invitation/delete_invitation_team", data, {
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

  //get All Extended deparartments
  getExtendedDepartments(token) {
    return http.post("lists/extended_departments", token, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
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

  departmentsByToken(data) {
    return http.post("customers/staff_department_by_company", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // members filter service

  // member filter by roleId
  memberByRoleId(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // member filter by departments

  memberByDepartments(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // member filrer by categories

  memberByCategories(data) {
    return http.post("customers/filter_member", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // member filter by search keyword

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

  // filter permissions

  filterMemberPermission(data) {
    return http.post("staffs/member_permissions_filter", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // get years list
  getYears() {
    return http.get("lists/years");
  }

  // setup new company
  setUpCompany(data) {
    return http.post("customers/data/", data);
  }

  // company profile details
  companyProfileDetails(data) {
    return http.post("customers/company_detail", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // update Company
  updateCompany(data) {
    return http.post("customers/update_company", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // Company update exchange rates
  currencyExchnageRate(data) {
    return http.post("customers/currency_exchange_rate", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // Company get exchange rates
  getCurrencyExchnageRate(data) {
    return http.post("customers/currency_exchange_list", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // get All roles that are available in comapny
  allSlugRoles() {
    return http.get("lists/roles_slug", {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }

  // get all currency
  getAllCurrency() {
    return http.get("lists/currencies");
  }

  // Career Info Departments
  careerInfoDepartment() {
    return http.get("lists/career_info_department");
  }

  //add one deparartment
  addCareerDepartment(data) {
    return http.post("staffs/add_new_department", data);
  }

  //get Invitation list file
  confirmedInvitationFile(data) {
    return http.post("invitation/send_invitation_file_confirm", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
}

export default new CompanyService();
