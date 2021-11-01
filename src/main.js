import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";
import "bootstrap";
import "bootstrap/scss/bootstrap.scss";
import "@vueform/multiselect/themes/default.scss";
import "@vueform/toggle/themes/default.scss";
import "./assets/scss/vue_mainStyle.scss";

createApp(App).use(Toaster).use(store).use(router).mount("#app");
