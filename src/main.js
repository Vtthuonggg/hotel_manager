import Vue from "vue";
import App from "./App.vue";
import vuetify from "vuetify";
import router from "./router";
import Toast from "vue-toastification";
import "vuetify/dist/vuetify.min.css";
import "vue-toastification/dist/index.css";

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
