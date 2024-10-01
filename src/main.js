import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import router from "./router";
import VueTheMask from "vue-the-mask";
import Toast from "vue-toastification";
import "vuetify/dist/vuetify.min.css";
import "vue-toastification/dist/index.css";
import "@mdi/font/css/materialdesignicons.css";
import store from "./components/store/store";
Vue.use(Vuetify);
Vue.use(VueTheMask);
Vue.config.productionTip = false;
Vue.use(Toast, {
  duration: 1500,
  hideProgressBar: true,
});

new Vue({
  store,
  router,
  vuetify: new Vuetify({
    icons: {
      iconfont: "mdi",
    },
  }),
  render: (h) => h(App),
}).$mount("#app");
