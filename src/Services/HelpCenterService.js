import http from "@/http-common";

class HelpCenterService {
  reportAProblem() {
    return http.post();
  }
  getGlossaries() {
    return http.get();
  }
  videoAndFAQ() {
    return http.get();
  }
}

export default new HelpCenterService();
