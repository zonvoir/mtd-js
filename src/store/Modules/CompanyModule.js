import { createStore } from "vuex";
export default createStore({
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    Departments: [],
    role_id: undefined,
    roleInCompany: undefined,
    invitationStaffRoleList: [], // invitation list of members
    activeCompany: undefined,
    companyInfoDetails: [],
    companyMembers: [],
    staffsCompanies: [],
    staffsDepartment: [],
    memberPermissions: [], //member permission array
    activeYear: "" + new Date().getFullYear(),
  },
  mutations: {
    GET_DEPARTMENTS: (state, value) => {
      state.Departments = value;
    },
    // company profile
    setMemberPermissions(state, values) {
      state.memberPermissions = values;
    },
    setYear(state, values) {
      state.activeYear = values;
    },
    setStaffsDepartment(state, values) {
      state.staffsDepartment = values;
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
  },
  actions: {
    GET_ALOCATED_DEPARTMENTS(context, val) {
      context.commit("setAlocatedDepartments", val);
    },
    GET_PERMISSION_ARRAY(context, val) {
      context.commit("setMemberPermissions", val);
    },
    GET_ALL_CATEGORIES(context, val) {
      context.commit("setAllCategories", val);
    },
    getYear(context, val) {
      context.commit("setYear", val);
    },
    async GET_INVITATION_STAFFROLE_LIST(context, val) {
      context.commit("setInvitationStaffRoleList", val);
    },
    async getActiveCompany(context, val) {
      context.commit("setActiveCompany", val);
    },
    async getCompanyInfoDetails(context, val) {
      context.commit("setCompanyInfoDetails", val);
    },
    async getCompanyMembers(context, val) {
      context.commit("setCompanyMembers", val);
    },
    async GET_STAFFS_DEPARTMENT(context, val) {
      context.commit("setStaffsDepartment", val);
    },
    async getStaffsCompanies(context, val) {
      context.commit("setStaffsCompanies", val);
    },
    async getRoleId(context, val) {
      context.commit("setRoleId", val);
    },
    async getRoleInCompany(context, val) {
      context.commit("setRoleInCompany", val);
    },
    async getPersonalInfo(context, val) {
      context.commit("setPersonalInfo", val);
    },
  },
  getters: {
    staffDepartments: (state) => state.Departments,
    memberPermissions: (state) => state.memberPermissions, //get local storage data
    activeYear: (state) => state.activeYear,
    invitationStaffRoleList: (state) => state.invitationStaffRoleList,
    activeCompany: (state) => state.activeCompany,
    staffsCompanies: (state) => state.staffsCompanies,
    roleInCompany: (state) => state.roleInCompany,
    companyMembers: (state) => state.companyMembers,
    companyInfoDetails: (state) => state.companyInfoDetails,
    staffsDepartment: (state) => state.staffsDepartment,
  },
});

// const state = {
//   staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
//   Departments: [],
//   role_id: undefined,
//   roleInCompany: undefined,
//   invitationStaffRoleList: [], // invitation list of members
//   activeCompany: undefined,
//   companyInfoDetails: [],
//   companyMembers: [],
//   staffsCompanies: [],
//   staffsDepartment: [],
//   memberPermissions: [], //member permission array
//   activeYear: "" + new Date().getFullYear(),
// };
// const mutations = {
//   GET_DEPARTMENTS: (state, value) => {
//     state.Departments = value;
//   },
//   // company profile
//   setMemberPermissions(state, values) {
//     state.memberPermissions = values;
//   },
//   setYear(state, values) {
//     state.activeYear = values;
//   },
//   setStaffsDepartment(state, values) {
//     state.staffsDepartment = values;
//   },
//   setActiveCompany(state, company) {
//     state.activeCompany = company;
//   },
//   setStaffsCompanies(state, values) {
//     state.staffsCompanies = values;
//   },
//   setCompanyInfoDetails(state, info) {
//     state.companyInfoDetails = info;
//   },
//   setCompanyMembers(state, values) {
//     state.companyMembers = values;
//   },
//   setInvitationStaffRoleList(state, list) {
//     console.log("all invited list", list);
//     state.invitationStaffRoleList = list;
//   },
//   setRoleId(state, role) {
//     state.role_id = role;
//   },
//   setRoleInCompany(state, id) {
//     state.roleInCompany = id;
//   },
//   // company profile
// };
// const actions = {
//   GET_ALOCATED_DEPARTMENTS(context, val) {
//     context.commit("setAlocatedDepartments", val);
//   },
//   GET_PERMISSION_ARRAY(context, val) {
//     context.commit("setMemberPermissions", val);
//   },
//   GET_ALL_CATEGORIES(context, val) {
//     context.commit("setAllCategories", val);
//   },
//   getYear(context, val) {
//     context.commit("setYear", val);
//   },
//   async GET_INVITATION_STAFFROLE_LIST(context, val) {
//     context.commit("setInvitationStaffRoleList", val);
//   },
//   async getActiveCompany(context, val) {
//     context.commit("setActiveCompany", val);
//   },
//   async getCompanyInfoDetails(context, val) {
//     context.commit("setCompanyInfoDetails", val);
//   },
//   async getCompanyMembers(context, val) {
//     context.commit("setCompanyMembers", val);
//   },
//   async GET_STAFFS_DEPARTMENT(context, val) {
//     context.commit("setStaffsDepartment", val);
//   },
//   async getStaffsCompanies(context, val) {
//     context.commit("setStaffsCompanies", val);
//   },
//   async getRoleId(context, val) {
//     context.commit("setRoleId", val);
//   },
//   async getRoleInCompany(context, val) {
//     context.commit("setRoleInCompany", val);
//   },
//   async getPersonalInfo(context, val) {
//     context.commit("setPersonalInfo", val);
//   },
// };
// const getters = {
//   // staffDepartments: (state) => state.Departments,
//   memberPermissions: (state) => state.memberPermissions, //get local storage data
//   activeYear: (state) => state.activeYear,
//   invitationStaffRoleList: (state) => state.invitationStaffRoleList,
//   activeCompany: (state) => state.activeCompany,
//   staffsCompanies: (state) => state.staffsCompanies,
//   roleInCompany: (state) => state.roleInCompany,
//   companyMembers: (state) => state.companyMembers,
//   companyInfoDetails: (state) => state.companyInfoDetails,
//   staffsDepartment: (state) => state.staffsDepartment,
// };
// export default { state, getters, mutations, actions };
