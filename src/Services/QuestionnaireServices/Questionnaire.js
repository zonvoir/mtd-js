import http from "@/http-common";
class QuestionnaireService {
  //get Category by ID
  getOneCategory(data) {
    return http.post("questionnaire_api/getQuestionnaire", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  // get questionnaire categories
  getAllQuestionnireCategories(data) {
    return http.post("questionnaire_api/questionnaire_list", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
  // submit AnsWer
  submitAnswer(data) {
    return http.post("questionnaire_api/submit_answer", data, {
      headers: {
        "X-Company": localStorage.getItem("selected_company"),
        "X-Year": localStorage.getItem("selected_year"),
      },
    });
  }
}
export default new QuestionnaireService();
