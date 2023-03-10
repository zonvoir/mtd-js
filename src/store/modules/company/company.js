import errorhandler from "../../../utils/Error";
// import renameKeys from "../../../utils/commonHelperFuntions";
import CompanyService from "../../../Services/Company/CompanyService";
const state = {
  // staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
  allDeafultRoles: undefined,
  consulatant_roleId: undefined,
  owner_roleId: undefined,
  manager_roleId: undefined,
  employee_roleId: undefined,
  defaultCompanyDeptId: undefined, // default company department id
  role_id: undefined,
  roleInCompany: { roleId: 0, can_invite: false, view_company_detail: false },
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
  companyData: undefined,
  currencyExRates: undefined,

  allCurrency: [],

  defualtCurrency: undefined,
};
const mutations = {
  // company profile default
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
    state.invitationStaffRoleList = list;
  },

  // Role Id
  setRoleId(state, role) {
    state.role_id = role;
  },

  // role In company
  setRoleInCompany(state, id) {
    state.roleInCompany = id;
  },

  //  new Career Deaprtment
  setAlocatedDepartments(state, values) {
    state.alocatedDepartments = values;
  },

  // update Company data
  setUpdateCompnay(state, values) {
    state.companyData = values;
  },

  // update Company Currency
  setCurrencyExRates(state, values) {
    state.currencyExRates = values;
  },

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
  setAllCurrency(state, val) {
    state.allCurrency = val;
  },
  setDefualtCurrency(state, val) {
    state.defualtCurrency = val;
  },
};
const actions = {
  GET_ALL_CURRENCY: ({ commit }) => {
    return new Promise((resolve, reject) => {
      CompanyService.getAllCurrency().then(
        (res) => {
          if (res.data.status) {
            if (!res.data.data.length) return;
            let curr = res.data.data.find(
              (element) => element.isdefault === "0"
            );
            let curId = curr.id;
            let currencyArr = res.data.data.map((item) => {
              return {
                value: item.id,
                label: item.name,
              };
            });
            commit("setDefualtCurrency", curId);
            commit("setAllCurrency", currencyArr);
          } else {
            commit("setAllCurrency", []);
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

  UPDATE_CUSTOM_CURRENCY_EXCHANGE_RATES: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.currencyExchnageRate(data).then(
        (res) => {
          if (res.data.status) {
            commit("setCurrencyExRates", res.data.data);
          } else {
            commit("setCurrencyExRates", {});
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

  GET_CUSTOM_CURRENCY_EXCHANGE_RATES: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.getCurrencyExchnageRate(data).then(
        (res) => {
          if (res.data.status) {
            commit("setCurrencyExRates", res.data.data);
          } else {
            commit("setCurrencyExRates", {});
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

  CAMPNAY_PROFILE_DATA: ({ commit, state }, data) => {
    state.companyData = {};
    return new Promise((resolve, reject) => {
      commit("getLoadingStatus", true, { root: true });

      CompanyService.companyProfileDetails(data).then(
        (res) => {
          if (res.data.status) {
            commit("setUpdateCompnay", res.data.data);
          } else {
            commit("setUpdateCompnay", []);
            errorhandler(res);
          }
          commit("getLoadingStatus", false, { root: true });
          resolve(res);
        },
        (error) => {
          commit("getLoadingStatus", false, { root: true });
          reject(error);
        }
      );
    });
  },

  UPDATE_CAMPNAY_DATA: ({ commit, state }, data) => {
    state.companyData = {};
    return new Promise((resolve, reject) => {
      commit("getLoadingStatus", true, { root: true });

      CompanyService.updateCompany(data).then(
        (res) => {
          if (res.data.status) {
            commit("setUpdateCompnay", res.data.data);
          } else {
            commit("setUpdateCompnay", []);
            errorhandler(res);
          }
          commit("getLoadingStatus", false, { root: true });

          resolve(res);
        },
        (error) => {
          commit("getLoadingStatus", false, { root: true });
          reject(error);
        }
      );
    });
  },

  GET_ALL_CAREER_DEPARTMENT: ({ commit }) => {
    return new Promise((resolve, reject) => {
      CompanyService.careerInfoDepartment().then(
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
    if (deptarments && deptarments.length) {
      let deptArr = deptarments.map((item) => {
        return {
          value: item.departmentid,
          label: item.name,
        };
      });
      commit("setStaffsDepartment", deptArr);
    }
  },

  GET_STAFFS_QUESTIONNIRE_DEPARTMENT: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      commit("getLoadingStatus", true, { root: true });
      CompanyService.getExtendedDepartments(data).then(
        (res) => {
          commit("getLoadingStatus", false, { root: true });
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
      commit("getLoadingStatus", true, { root: true });
      CompanyService.getInvitedTeamManagenet(data).then(
        (res) => {
          if (res.data.status) {
            if (!res.data.data.length) return;
            commit("setInvitationsForQuestionnaireTeam", res.data.data);
          } else {
            commit("setInvitationsForQuestionnaireTeam", []);
            errorhandler(res, this);
          }
          commit("getLoadingStatus", false, { root: true });
          resolve(res);
        },
        (error) => {
          commit("getLoadingStatus", false, { root: true });
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
      CompanyService.confirmedTeamMemberByList(data).then(
        (res) => {
          if (res.data.status) {
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

  GET_REMOVE_TEAM_MEMBER: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CompanyService.removeTeamMember(data).then(
        (res) => {
          if (res.data.status) {
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
  companyData: (state) => state.companyData,
  defualtCurrency: (state) => state.defualtCurrency,
  currencyExRates: (state) => state.currencyExRates,
  allCurrency: (state) => state.allCurrency,
  consulatant_roleId: (state) => state.consulatant_roleId,
  owner_roleId: (state) => state.owner_roleId,
  manager_roleId: (state) => state.manager_roleId,
  employee_roleId: (state) => state.employee_roleId,
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
