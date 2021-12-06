import http from "@/http-common";
class QuestionnaireService {
  //get Category by ID
  getOneCategory(data) {
    return http.post("questionnaire_api/getQuestionnaire", data);
  }
  // submit AnsWer
  submitAnswer(data) {
    return http.post("questionnaire_api/submit_answer", data);
  }
}
export default new QuestionnaireService();
