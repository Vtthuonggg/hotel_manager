import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugin/vuetify";
import router from "./router";
import Toast from "vue-toastification";

Vue.config.productionTip = false;
Vue.use(Toast, {
  duration: 2000,
  hideProgressBar: true,
});

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
