import CommonService from "../../Services/CommonService";

const state = {
  staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
  Departments: [],
};
const mutations = {
  GET_DEPARTMENTS: (state, value) => {
    state.Departments = value;
  },
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
  staffDepartments: (state) => state.Departments,
};
export default { state, getters, mutations, actions };
