import CommonService from "../../../Services/CommonService";
import errorhandler from "../../../utils/Error";
export default {
  state: {
    staffData: JSON.parse(localStorage.getItem("bWFpbCI6Inpvb")),
    mainIndustries: [],
    subIndustries: [],
    detailIndustries: [],
    allCountries: [],
    allRegion: [],
    allCurrency: [],
    allRoles: [],
    personalInfo: [],
    allLegalFormCorporation: [],
    allSenoirityLevels: [],
    allCompanyDepartment: [], // All department of Company
    allCategories: [], // All department of Company
  },
  mutations: {
    // personal Account
    setPersonalInfo(state, per_data) {
      state.personalInfo = [];
      state.personalInfo = per_data;
    },
    setMainIndustry(state, industry) {
      // console.log(this);
      state.mainIndustries = industry;
    },
    setSubIndustry(state, subIndustry) {
      state.subIndustries = subIndustry;
    },
    setDetailIndustry(state, detailIndustry) {
      state.detailIndustries = detailIndustry;
    },
    setAllRegion(state, region) {
      state.allRegion = region;
    },
    setAllCurrency(state, val) {
      state.allCurrency = val;
    },
    setAllCountries(state, country) {
      state.allCountries = country;
    },
    setAllRoles(state, country) {
      state.allRoles = country;
    },
    setAllLegalFormCorporation(state, legalCorp) {
      state.allLegalFormCorporation = legalCorp;
    },
    setAllSenoirityLevels(state, senoirity) {
      state.allSenoirityLevels = senoirity;
    },
    setAllCompanyDepartment(state, values) {
      state.allCompanyDepartment = values;
    },
    setAllCategories(state, values) {
      state.allCategories = values;
    },
  },
  actions: {
    GET_MAIN_INDUSTRIES: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllIndustries().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let indusrtyArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setMainIndustry", indusrtyArray);
            } else {
              commit("setMainIndustry", []);
              errorhandler(res);
            }
            resolve(res);
          },
          (error) => {
            commit("setMainIndustry", []);
            reject(error);
          }
        );
      });
    },
    GET_SUB_INDUSTRIES: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllSubIndustries(data).then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let subIndusrtyArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setSubIndustry", subIndusrtyArray);
            } else {
              commit("setSubIndustry", []);
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
    GET_DEATAIL_INDUSTRIES: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllDetailedIndustries(data).then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let detailIndusrtyArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setDetailIndustry", detailIndusrtyArray);
            } else {
              commit("setDetailIndustry", []);
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
    GET_ALL_REGION: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllRegion().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              console.log("all region");
              let regionArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.region_name,
                };
              });
              commit("setAllRegion", regionArray);
            } else {
              commit("setAllRegion", []);
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
    GET_ALL_CURRENCY: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllCurrency().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              console.log("all cuurency", res.data.data);
              let currencyArr = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
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
    GET_COUNTRIES: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllCountry(data).then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let countryArray = res.data.data.map((item) => {
                return {
                  value: item.country_id,
                  label: item.short_name,
                };
              });
              commit("setAllCountries", countryArray);
            } else {
              commit("setAllCountries", []);
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
    GET_ROLES: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllOwnRoleInCompany().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let rolesArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setAllRoles", rolesArray);
            } else {
              commit("setAllRoles", []);
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
    GET_ALL_LEGAL_FORM_CORPORATION: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllLegalFormCorporation().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let legalFormCorpArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setAllLegalFormCorporation", legalFormCorpArray);
            } else {
              commit("setAllLegalFormCorporation", []);
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
    GET_ALL_SENOIRITY_LEVELS: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllSeniorityLevels().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let seniorLevel = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.level,
                };
              });
              commit("setAllSenoirityLevels", seniorLevel);
            } else {
              commit("setAllSenoirityLevels", []);
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
    GET_ALL_COMPANY_DEPARTMENT: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.getAllDepartments().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let deptArr = res.data.data.map((item) => {
                return {
                  value: item.departmentid,
                  label: item.name,
                };
              });
              commit("setAllCompanyDepartment", deptArr);
            } else {
              commit("setAllCompanyDepartment", []);
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
    ADD_NEW_COMPANY_DEPARTMENT: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        CommonService.addNewDepartment(data).then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let deptArr = res.data.data.map((item) => {
                return {
                  value: item.departmentid,
                  label: item.name,
                };
              });
              commit("setAllCompanyDepartment", deptArr);
            } else {
              commit("setAllCompanyDepartment", []);
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

    GET_ALL_CATEGORIES: ({ commit }) => {
      return new Promise((resolve, reject) => {
        CommonService.allCategories().then(
          (res) => {
            if (res.data.status) {
              if (!res.data.data.length) return;
              let categoryArray = res.data.data.map((item) => {
                return {
                  value: item.id,
                  label: item.name,
                };
              });
              commit("setAllCategories", categoryArray);
            } else {
              commit("setAllCategories", []);
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
    getYear(context, val) {
      context.commit("setYear", val);
    },

    // async getPersonalInfo(context, val) {
    //   context.commit("setPersonalInfo", val);
    // },
    getPersonalInfo: ({ commit }, data) => {
      return new Promise((resolve, reject) => {
        CommonService.getPersonalDetails(data).then(
          (res) => {
            if (res.data.status) {
              console.log(res.data.data);
              commit("setPersonalInfo", res.data.data);
            } else {
              commit("setPersonalInfo", []);
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
  },
  getters: {
    personalInfo: (state) => state.personalInfo,
    mainIndustries: (state) => state.mainIndustries,
    subIndustries: (state) => state.subIndustries,
    detailIndustries: (state) => state.detailIndustries,
    allCountries: (state) => state.allCountries,
    allRegion: (state) => state.allRegion,
    allCurrency: (state) => state.allCurrency,
    allRoles: (state) => state.allRoles,
    allLegalFormCorporation: (state) => state.allLegalFormCorporation,
    allSenoirityLevels: (state) => state.allSenoirityLevels,
    allCompanyDepartment: (state) => state.allCompanyDepartment,
    allCategories: (state) => state.allCategories,
  },
};
