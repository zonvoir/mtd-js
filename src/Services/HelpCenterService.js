import http from "@/http-common";

class HelpCenterService {
  reportAProblem(data) {
    return http.post("lists/issue_types", data);
  }
  getAllIssues() {
    return http.get("lists/issue_types");
  }
  getGlossaries() {
    return http.get("lists/glossary");
  }
  glossaryByLetter(val) {
    return http.get(`lists/glossary_by_tagname/${val}`);
  }
  videoAndFAQ() {
    return http.get();
  }
}

export default new HelpCenterService();
