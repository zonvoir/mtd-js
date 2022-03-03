import { createStore } from "vuex";
import commonStore from "./modules/common/common";
import questionnaireStore from "./modules/questionnaire/questionnaire";
import companyModule from "./modules/company/company";

export default createStore({
  modules: {
    commonStore,
    questionnaireStore,
    companyModule,
    // questionnaireModule,
    // commonModule,
  },
});
