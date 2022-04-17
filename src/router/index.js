import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Visitor from "../views/Visitor.vue";
import Admin from "../views/admin/Admin.vue";
import User from "../views/admin/user/User.vue";
import Visit from "../views/admin/visitor/Visitor.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/visitor",
    name: "Visitor",
    component: Visitor,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
    children: [
      {
        path: "user",
        component: User,
        name: "用户管理",
      },
      {
        path: "visit",
        component: Visit,
        name: "访客管理",
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
