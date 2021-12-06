import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import quest from "./store/questionnaire";
import Toaster from "@meforma/vue-toaster";
import CKEditor from "@ckeditor/ckeditor5-vue";
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
createApp(App)
  .use(i18n)
  .use(Toaster)
  .use(CKEditor)
  .use(store)
  .use(quest)
  .use(router)
  .mount("#app");
