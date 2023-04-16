import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "@/services/services";
import Verify from "../views/Verify.vue";
import GetStarted from "../views/GetStarted.vue";
import ChooseLogin from "../views/ChooseLogin.vue";
import LogIn from "../views/LogIn.vue";
import Register from "../views/Register.vue";
import RegisterAdmin from "../views/RegisterAdmin.vue";
import HomeView from "../views/HomeView.vue";

import { returnStatement } from "@babel/types";

/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "homeview",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/getstarted",
    name: "getstarted",
    component: GetStarted,
  },
  {
    path: "/choose",
    name: "chooselogin",
    component: ChooseLogin,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/register/admin",
    name: "registeradmin",
    component: RegisterAdmin,
  },
  {
    path: "/verify",
    name: "verify",
    component: Verify,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicSite = ["/login", "/register", "/register/admin", "/choose", "/getstarted"];
  const loginRequired = !publicSite.includes(to.path);
  let isAuthenticated = Auth.authenticated()
  console.log(isAuthenticated)
  if (!isAuthenticated && loginRequired) {
    next("/login");
    return;
  }
  else if (isAuthenticated && !loginRequired) {
    next("/")
    return
  }
  next();
});

export default router;
