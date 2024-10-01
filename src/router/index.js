import Vue from "vue";
import Cookies from "js-cookie";
import Router from "vue-router";
import LoginPage from "../components/login_page.vue";
import RegisterPage from "../components/register_page.vue";
import DashboardPage from "../components/dashboard_page.vue";
// import Navbar from "../components/navbar_page.vue";
import Room from "../components/room/list_room_page.vue";
import Report from "../components/report/report_page.vue";
import CreateOrrder from "../components/order/create_order_page.vue";
import Service from "../components/service/list_service_page.vue";
import Invoice from "../components/invoice_page.vue";
import ListOrder from "../components/order/list_order_page.vue";
Vue.use(Router);

const routes = [
  {
    path: "/",
    redirect: () => {
      const haveUser = Cookies.get("accountId") != null;
      return haveUser ? "/dashboard" : "/login";
    },
  },
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
    path: "/create-order",
    name: "CreateOrder",
    meta: { title: "Bate - Tạo đơn" },
    component: CreateOrrder,
  },
  {
    path: "/invoice",
    name: "Invoice",
    meta: { title: "Bate - Tạo hóa đơn" },
    component: Invoice,
  },

  {
    path: "/dashboard",
    component: DashboardPage,
    children: [
      {
        path: "",
        redirect: "list-room",
      },
      {
        path: "list-room",
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
      {
        path: "list-order",
        name: "ListOrder",
        component: ListOrder,
        meta: { title: "Bate - Danh sách đơn" },
      },
    ],
  },
];

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = Cookies.get("accountId") != null;
//   if (!isLoggedIn && to.path !== "/login" && to.path !== "/register") {
//     Vue.prototype.$toast.error("Vui lòng đăng nhập");
//     next("/login");
//   } else {
//     next();
//   }
// });
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "Bate - Quản lý khách sạn";
  next();
});
export default router;
