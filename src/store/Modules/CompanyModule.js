import CommonService from "../../Services/CommonService";

const state = {
  staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
  Departments: [],
  role_id: undefined,
  roleInCompany: undefined,
  invitationStaffRoleList: [], // invitation list of members
  activeCompany: undefined,
  companyInfoDetails: [],
  companyMembers: [],
  staffsCompanies: [],
  memberPermissions: [], //member permission array
  activeYear: "" + new Date().getFullYear(),
};
const mutations = {
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
  // setStaffsDepartment(state, values) {
  //   state.staffsDepartment = values;
  // },
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
};
const actions = {
  SET_DEPARTMENTS: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      CommonService.getAllDepartments(data).then(
        (res) => {
          if (res.data.status) {
            let departmentLists = res.data.data.filter(function (depts) {
              return depts.is_default === "0";
            });
            commit("GET_DEPARTMENTS", departmentLists);
          }
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  },
};
const getters = {
  // staffDepartments: (state) => state.Departments,
  memberPermissions: (state) => state.memberPermissions, //get local storage data
  activeYear: (state) => state.activeYear,
  invitationStaffRoleList: (state) => state.invitationStaffRoleList,
  activeCompany: (state) => state.activeCompany,
  staffsCompanies: (state) => state.staffsCompanies,
  roleInCompany: (state) => state.roleInCompany,
  companyMembers: (state) => state.companyMembers,
  companyInfoDetails: (state) => state.companyInfoDetails,
  // staffsDepartment: (state) => state.staffsDepartment,
};
export default { state, getters, mutations, actions };
