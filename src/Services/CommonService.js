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
  //get All deparartments
  getAllDepartments() {
    return http.get("lists/department");
  }
  //get deparartment by ID
  getOneDepartment(id) {
    return http.get(`lists/department/${id}`);
  }
  // get all Categories
  // getAllCategories(dept_id) {
  //   return http.get(`lists/categories/${dept_id}`);
  // }
  getAllCategories(data) {
    return http.post("questionnaire_api/questionnaire_list", data);
  }
  // get Seniority Leveles
  getAllSeniorityLevels() {
    return http.get("lists/seniority_level");
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

  // get all Region
  getAllRegion() {
    return http.get("lists/region");
  }
  // get all country by region
  getAllCountry(id) {
    return http.get(`lists/region_countries/${id}`);
  }
}

export default new CommonService();
