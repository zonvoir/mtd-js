import { createStore } from "vuex";
import commonStore from "./modules/common/common";
import questionnaireStore from "./modules/questionnaire/questionnaire";
import companyStore from "./modules/company/company";

export default createStore({
  modules: {
    commonStore,
    questionnaireStore,
    companyStore,
  },
});
