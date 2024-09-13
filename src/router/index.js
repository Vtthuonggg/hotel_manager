import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../components/login_page.vue";
import RegisterPage from "../components/register_page.vue";
import DashboardPage from "../components/dashboard_page.vue";
// import Navbar from "../components/navbar_page.vue";
import Room from "../components/room/list_room_page.vue";
import Report from "../components/report/report_page.vue";
import Service from "../components/service/list_product_page.vue";
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
    meta: { title: "Bate - Đăng ký" },

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
        meta: { title: "Bate - Danh sách phòng" },
      },
      {
        path: "report",
        name: "Reports",
        component: Report,
        meta: { title: "Bate - Báo cáo" },
      },
      {
        path: "service",
        name: "Service",
        component: Service,
        meta: { title: "Bate - Dịch vụ" },
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Bate - Quản lý khách sạn";
  next();
});
export default router;
