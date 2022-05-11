import http from "@/http-common";
class CommonService {
  //  Change Language
  setLanguage(data) {
    return http.post("staffs/change_staff_language", data);
  }

  // get All Industries
  getAllIndustries() {
    return http.get("lists/industry");
  }

  //get Token Is Expired
  getTokenValidation(data) {
    return http.post("staffs/is_staff_token_expired", data);
  }

  //get All deparartments
  getAllDepartments() {
    return http.get("lists/department");
  }

  //add one deparartment
  addNewDepartment(data) {
    return http.post("staffs/add_new_department", data);
  }

  // get Seniority Leveles
  getAllSeniorityLevels() {
    return http.get("lists/seniority_level");
  }

  // get  categories llist
  allCategories() {
    return http.get("lists/categories");
  }

  //get all sub industries based on subIndustries
  getAllSubIndustries(id) {
    return http.get(`lists/sub_industry_by_main_industry/${id}`);
  }

  // get all detailed industries based on subIndustries id
  getAllDetailedIndustries(id) {
    return http.get(`lists/detailed_industry_by_sub_industry/${id}`);
  }

  // get all legal  form of  corporation
  getAllLegalFormCorporation() {
    return http.get("lists/corporation_legal_form");
  }

  // get all Own role in company
  getAllOwnRoleInCompany() {
    return http.get("lists/company_role");
  }

  // Get state on company step 1
  getStates(countryId) {
    if (countryId) {
      return http.post("lists/states_by_country_id", { country_id: countryId });
    } else {
      return http.post("lists/states_by_country_id", { country_id: "" });
    }
  }
  // Get city on company step 1
  getCities(stateId) {
    if (stateId) {
      return http.post("lists/cities_by_state_id", { state_id: stateId });
    } else {
      return http.post("lists/cities_by_state_id", { state_id: "" });
    }
  }
  // get all Region
  getAllRegion() {
    return http.get("lists/region");
  }

  // get  Region when country id is given
  getRegionByCountryId(countryId) {
    return http.get(`lists/region_by_country/${countryId}`);
  }

  // get all country by region
  getAllCountry(regionId) {
    if (regionId) {
      return http.post("lists/region_countries", regionId);
    } else {
      return http.post("lists/region_countries");
    }
  }
  // get all country code by country id
  getCountryCode(countryId) {
    return http.post("userlogin/country_codes", countryId);
  }

  // Personal Details update
  getPersonalDetails(data) {
    return http.post("staffs/staff_by_token", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
}

export default new CommonService();
