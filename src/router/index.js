import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../components/login_page.vue";
import RegisterPage from "../components/register_page.vue";
import DashboardPage from "../components/dashboard_page.vue";
// import Navbar from "../components/navbar_page.vue";
import Room from "../components/room/list_room_page.vue";
import Report from "../components/report/report_page.vue";
Vue.use(Router);

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterPage,
  },

  {
    path: "/dashboard",
    component: DashboardPage,
    children: [
      {
        path: "",
        redirect: "listroom",
      },
      {
        path: "listroom",
        name: "ListRoom",
        component: Room,
      },
      {
        path: "report",
        name: "Reports",
        component: Report,
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
