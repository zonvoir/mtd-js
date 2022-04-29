import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store/index";
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
// sweet alert//
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Tooltip from "primevue/tooltip";

import { loadLocaleMessages, setupI18n } from "./i18n";

const i18n = setupI18n({
  locale: localStorage.getItem("language") || "en", // set locale
  fallbackLocale: "en", // set fallback locale
  fallbackWarn: false,
});
loadLocaleMessages(i18n, localStorage.getItem("language") || "en");
// .use(i18n)
// const app = createApp(App);
const app = createApp({
  extends: App,
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
});
app
  .use(i18n)
  .use(Toaster)
  .use(CKEditor)
  .use(Toast, {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true,
  })
  .use(VueSweetalert2)
  .use(store)
  .use(PrimeVue)
  .use(router)
  .directive("tooltip", Tooltip)
  .mount("#app");
