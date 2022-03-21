import errorhandler from "../../../utils/Error";
import CompanyService from "../../../Services/Company/CompanyService";
const state = {
  staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
  allDeafultRoles: undefined,
  consulatant_roleId: undefined,
  owner_roleId: undefined,
  manager_roleId: undefined,
  employee_roleId: undefined,
  defaultCompanyDeptId: undefined, //5 is default company department id
  role_id: undefined,
  roleInCompany: { roleId: 0, can_invite: false },
  invitationStaffRoleList: [], // invitation list of members
  activeCompany: undefined,
  companyInfoDetails: [],
  companyMembers: [],
  staffsCompanies: [],
  memberPermissions: [], //member permission array
  activeYear: "" + new Date().getFullYear(),
  // new
  alocatedDepartments: [], // departments allocated to perticular member
  staffsDepartment: [], // department of a member that is logIn
  staffsQuestionnireDepartments: [], // questionnire departments allocated to perticular member in Company
  allCareerDepartment: [], // All department of Career
  invitationsForQuestionnaireTeam: undefined,
  inviteTeamMember: undefined,
};
const mutations = {
  // company profile
  setAllDeafultRoles(state, values) {
    values.roles.forEach((role) => {
      if (role.role_slug == "owner") {
        state.owner_roleId = role.role_id;
      } else if (role.role_slug == "consultant") {
        state.consulatant_roleId = role.role_id;
      } else if (role.role_slug == "manager") {
        state.manager_roleId = role.role_id;
      } else if (role.role_slug == "employee") {
        state.employee_roleId = role.role_id;
      } else {
        state.allDeafultRoles = "xfds";
      }
    });
    if (values.default_department.slug == "company") {
      state.defaultCompanyDeptId = values.default_department.departmentid;
    }

    // state.allDeafultRoles = values;
  },
  setMemberPermissions(state, values) {
    state.memberPermissions = values;
  },
  setYear(state, values) {
    state.activeYear = values;
  },
  setActiveCompany(state, company) {
    state.activeCompany = company;
  },
  setStaffsCompanies(state, values) {
    state.staffsCompanies = values;
  },
  setCompanyInfoDetails(state, info) {
    state.companyInfoDetails = info;
  },
  setCompanyMembers(state, values) {
    state.companyMembers = values;
  },
  setInvitationStaffRoleList(state, list) {
    console.log("all invited list", list);
    state.invitationStaffRoleList = list;
  },
  setRoleId(state, role) {
    state.role_id = role;
  },
  setRoleInCompany(state, id) {
    state.roleInCompany = id;
  },
  // company profile
  //  new
  setAlocatedDepartments(state, values) {
    state.alocatedDepartments = values;
  },
  // setAllCategories(state, values) {
  //   state.allCategories = values;
  // },
  setStaffsDepartment(state, values) {
    state.staffsDepartment = values;
  },
  setStaffsQuestionnireDepartments(state, values) {
    state.staffsQuestionnireDepartments = values;
  },
  setInvitationsForQuestionnaireTeam(state, values) {
    state.invitationsForQuestionnaireTeam = values;
  },
  // set team member for
  setInviteTeamMember(state, val) {
    state.inviteTeamMember = val;
  },
  // set team member for
  setAllCareerDepartment(state, val) {
    state.allCareerDepartment = val;
  },
};
const actions = {
  GET_ALL_CAREER_DEPARTMENT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      CompanyService.careerInfoDepartment().then(
        (res) => {
          if (res.data.status) {
            console.log("res", res.data.data);
            if (!res.data.data.length) return;
            let deptArr = res.data.data.map((item) => {
              return {
                value: item.departmentid,
                label: item.name,
              };
            });
            commit("setAllCareerDepartment", deptArr);
          } else {
            commit("setAllCareerDepartment", []);
            errorhandler(res);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  ADD_NEW_CAREER_DEPARTMENT: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.addCareerDepartment(data).then(
        (res) => {
          if (res.data.status) {
            if (!res.data.data.length) return;
            let deptArr = res.data.data.map((item) => {
              return {
                value: item.departmentid,
                label: item.name,
              };
            });
            commit("setAllCareerDepartment", deptArr);
          } else {
            commit("setAllCareerDepartment", []);
            errorhandler(res);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  GET_ALOCATED_DEPARTMENTS(context, val) {
    context.commit("setAlocatedDepartments", val);
  },
  GET_PERMISSION_ARRAY(context, val) {
    context.commit("setMemberPermissions", val);
  },
  GET_ALL_DEAFULT_ROLES({ commit }) {
    return new Promise((resolve, reject) => {
      CompanyService.allSlugRoles().then(
        (res) => {
          if (res.data.status) {
            commit("setAllDeafultRoles", res.data.data);
          } else {
            errorhandler(res);
            commit("setAllDeafultRoles", undefined);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  // getYear(context, val) {
  //   context.commit("setYear", val);
  // },
  async GET_INVITATION_STAFFROLE_LIST(context, val) {
    context.commit("setInvitationStaffRoleList", val);
  },
  async getActiveCompany(context, val) {
    context.commit("setActiveCompany", val);
  },
  async getCompanyInfoDetails(context, val) {
    context.commit("setCompanyInfoDetails", val); // this is used in company setup page
  },
  async getCompanyMembers(context, val) {
    context.commit("setCompanyMembers", val);
  },
  async GET_STAFFS_DEPARTMENT({ commit }, deptarments) {
    if (!deptarments.length) return;
    let deptArr = deptarments.map((item) => {
      return {
        value: item.departmentid,
        label: item.name,
      };
    });
    commit("setStaffsDepartment", deptArr);
    // context.commit("setStaffsDepartment", val);
  },

  GET_STAFFS_QUESTIONNIRE_DEPARTMENT: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.getExtendedDepartments(data).then(
        (res) => {
          if (res.data.status) {
            if (!res.data.data.length) return;
            commit("setStaffsQuestionnireDepartments", res.data.data);
          } else {
            commit("setStaffsQuestionnireDepartments", []);
            errorhandler(res, this);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  GET_INVITATIONS_FOR_QUESTIONNAIRE_TEAM: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.getInvitedTeamManagenet(data).then(
        (res) => {
          if (res.data.status) {
            if (!res.data.data.length) return;
            commit("setInvitationsForQuestionnaireTeam", res.data.data);
          } else {
            commit("setInvitationsForQuestionnaireTeam", []);
            errorhandler(res, this);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  GET_INVITE_TEAM_MEMBER: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.inviteNewTeamMember(data).then(
        (res) => {
          if (res.data.status) {
            console.log("res to add new member", res.data.data);
            // commit("setInviteTeamMember", res.data.data);
            commit("setInvitationsForQuestionnaireTeam", res.data.data);
          } else {
            errorhandler(res);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  GET_INVITE_TEAM_MEMBER_BY_FILELIST: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.inviteTeamMemberByList(data).then(
        (res) => {
          if (res.data.status) {
            console.log("res to add new member", res.data.data);
            commit("setInviteTeamMember", res.data.data);
          } else {
            errorhandler(res);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  GET_REMOVE_TEAM_MEMBER: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.removeTeamMember(data).then(
        (res) => {
          if (res.data.status) {
            console.log("remve member ", res.data.data);
            commit("setInviteTeamMember", res.data.data);
          } else {
            errorhandler(res);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
  // async getStaffsCompanies(context, val) {
  //   context.commit("setStaffsCompanies", val);
  // },
  getStaffsCompanies: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.companiesList(data).then(
        (res) => {
          if (res.data.status) {
            commit("setStaffsCompanies", res.data.data);
          } else {
            errorhandler(res);
            commit("setStaffsCompanies", []);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },

  async getRoleId(context, val) {
    context.commit("setRoleId", val);
  },
  async getRoleInCompany(context, val) {
    context.commit("setRoleInCompany", val);
  },
};
const getters = {
  consulatant_roleId: (state) => state.consulatant_roleId,
  owner_roleId: (state) => state.owner_roleId,
  manager_roleId: (state) => state.manager_roleId,
  employee_roleId: (state) => state.employee_roleId,
  // team mangement getters
  invitationsForQuestionnaireTeam: (state) =>
    state.invitationsForQuestionnaireTeam,
  inviteTeamMember: (state) => state.inviteTeamMember,
  // team managemnt getters close
  allCareerDepartment: (state) => state.allCareerDepartment,
  alocatedDepartments: (state) => state.alocatedDepartments,
  staffsQuestionnireDepartments: (state) => state.staffsQuestionnireDepartments,
  staffsDepartment: (state) => state.staffsDepartment,
  memberPermissions: (state) => state.memberPermissions,
  activeYear: (state) => state.activeYear,
  invitationStaffRoleList: (state) => state.invitationStaffRoleList,
  activeCompany: (state) => state.activeCompany,
  staffsCompanies: (state) => state.staffsCompanies,
  roleInCompany: (state) => state.roleInCompany,
  companyMembers: (state) => state.companyMembers,
  companyInfoDetails: (state) => state.companyInfoDetails,
  defaultCompanyDeptId: (state) => state.defaultCompanyDeptId,
};
export default { state, getters, mutations, actions };
