import { createRouter, createWebHistory } from "vue-router";
import { Auth } from "@/services/services";
import Verify from "../views/Verify.vue";
import GetStarted from "../views/GetStarted.vue";
import ChooseLogin from "../views/ChooseLogin.vue";
import LogIn from "../views/LogIn.vue";
import Register from "../views/Register.vue";
import RegisterAdmin from "../views/RegisterAdmin.vue";
import HomeView from "../views/HomeView.vue";
import AdminSchedule from "../views/AdminSchedule.vue";
import Tables from "../views/Tables.vue";
import Profile from "../views/Profile.vue";
import RestaurantOpen from "../views/RestaurantOpen.vue";
import Pending from "../views/Pending.vue";

import { returnStatement } from "@babel/types";
import { penFancy } from "fontawesome";

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
  {
    path: "/schedule",
    name: "adminschedule",
    component: AdminSchedule,
  },
  {
    path: "/tables",
    name: "tables",
    component: Tables,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/restaurant/:id",
    name: "restaurantopen",
    component: RestaurantOpen,
  },
  {
    path: "/pending",
    name: "pending",
    component: Pending,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicSite = ["/getstarted", "/login", "/register", "/register/admin", "/choose" ];
  const adminSite = ["/schedule", "/tables"]
  const userSite = ["/", "/restaurant"]
  const userRole = Auth.getUserRole()
  let isAuthenticated = Auth.authenticated()

  const loginRequired = !publicSite.includes(to.path);
  const adminPath = adminSite.includes(to.path);
  const userPath = userSite.includes(to.path)
  
  //console.log(isAuthenticated, userRole, adminPath)
  if (!isAuthenticated && loginRequired) {
    next("/login");
  } else if (isAuthenticated && !loginRequired){
    next("/")
  } else if (isAuthenticated && userRole == "user" && adminPath) {
    console.log("User access denied to admin site")
    next("/"); // redirect to user site
  } else if (isAuthenticated && userRole == "admin" && userPath) {
    console.log("Admin access denied to user site")
    next("/schedule"); // redirect to admin site
  } else {
    next();
  }
});

export default router;
