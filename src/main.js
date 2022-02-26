import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import commonModule from "./store/Modules/CommonModule";
// import questModule from "./store/Modules/QuestionnaireModule";
// import companyModule from "./store/Modules/CompanyModule";
import quest from "./store/questionnaire";
import Toaster from "@meforma/vue-toaster";
import CKEditor from "@ckeditor/ckeditor5-vue";
import PrimeVue from "primevue/config";

import "primevue/resources/themes/bootstrap4-light-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import "@vueform/multiselect/themes/default.scss";
import "@vueform/toggle/themes/default.scss";
import "./assets/scss/vue_mainStyle.scss";
import { loadLocaleMessages, setupI18n } from "./i18n";

const i18n = setupI18n({
  locale: localStorage.getItem("language") || "en", // set locale
  fallbackLocale: "en", // set fallback locale
  fallbackWarn: false,
});
loadLocaleMessages(i18n, localStorage.getItem("language") || "en");

// .use(i18n)
const app = createApp(App);
app
  .use(i18n)
  .use(Toaster)
  .use(CKEditor)
  .use(quest)
  // .use(commonModule)
  // .use(companyModule)
  // .use(questModule)
  .use(PrimeVue)
  .use(router)
  .mount("#app");
