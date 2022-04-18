import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Visitor from "../views/Visitor.vue";
import Admin from "../views/admin/Admin.vue";
import User from "../views/admin/user/User.vue";
import Visit from "../views/admin/visitor/Visitor.vue";
import Resident from "../views/resident/Resident.vue";
import Announcement from "../views/resident/announcement/Announcement.vue";
import Exception from "../views/resident/exception/Exception.Vue";
import Access from "../views/resident/acc/Access.vue";
import Shopping from "../views/resident/shopping/Shopping.vue";
import AdminAnnouncement from "../views/admin/announcement/Announcement.vue";
import Id from "../views/resident/announcement/Id.vue";
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
      {
        path: "announcement",
        component: AdminAnnouncement,
        name: "公告管理",
      },
    ],
  },
  {
    path: "/",
    name: "Resident",
    component: Resident,
    children: [
      {
        path: "announcement",
        component: Announcement,
        name: "公告",
      },
      {
        path: "exception",
        component: Exception,
        name: "异常上报",
      },
      {
        path: "access",
        component: Access,
        name: "出入申请",
      },
      {
        path: "shopping",
        component: Shopping,
        name: "社区团购",
      },
    ],
  },
  {
    path: "/announcement/:id",
    name: "Id",
    component: Id,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
