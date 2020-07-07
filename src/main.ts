import "./env-setup";
import Vue from "vue";
import App from "./App.vue";
import "./register-service-worker";
import router from "./router";
import store from "./store";
import { setupFeathers } from "./api/feathers-client";

Vue.config.productionTip = false;

setupFeathers();

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount("#app");
