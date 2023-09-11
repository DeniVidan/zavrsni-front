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
import RestaurantDetail from "../views/RestaurantDetail.vue";

import { returnStatement } from "@babel/types";
import { penFancy, user } from "fontawesome";

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
  {
    path: "/restaurant/info/:id",
    name: "restaurantdetail",
    component: RestaurantDetail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const publicSite = ["/getstarted", "/login", "/register", "/choose"];
  const adminSite = ["/schedule", "/tables", "/pending"];
  const userSite = ["/", "/restaurant", "/verify"];
  const superadminSite = ["/register/admin"];
  const userRole = Auth.getUserRole();
  const userActivated = Auth.getUser().verified;
  //console.log("verified: ", userActivated);
  //console.log("user role: ", userRole)
  let isAuthenticated = Auth.authenticated();
  const loginRequired = !publicSite.includes(to.path);
  const adminPath = adminSite.includes(to.path);
  const userPath = userSite.includes(to.path);
  const superadminPath = superadminSite.includes(to.path);

  if (!isAuthenticated && loginRequired) {
    next("/login");
  } else if (userActivated === 0 && to.path !== "/verify") {
    next("/verify");
  } else if (userActivated === 1 && to.path === "/verify" && !loginRequired) {
    next("/"); // Redirect to home or other appropriate route
  } else if (isAuthenticated && !loginRequired && userActivated !== 0) {
    next("/");
  } else if (isAuthenticated && userRole !== "admin" && userRole !== "superadmin" && (adminPath || superadminPath)) {
    console.log("User access denied to admin site");
    next("/"); // redirect to user site
  } else if (isAuthenticated && userRole !== "user" && userRole !== "superadmin" && (userPath || superadminPath)) {
    // Only redirect to admin site if the current path is in adminSite and doesn't contain any user-specific routes
    console.log("Admin access denied to user site");
    next("/schedule"); // redirect to admin site
  } else if (isAuthenticated && userRole !== "user" && userRole !== "admin" && (adminPath || userPath)) {
    next("/register/admin")
  } else {
    next();
  }
});

/*
router.beforeEach(async (to, from, next) => {
  const publicSite = ["/getstarted", "/login", "/register", "/register/admin", "/choose"];
  const adminSite = ["/schedule", "/tables"]
  const userSite = ["/", "/restaurant", "/verify"]
  const userRole = Auth.getUserRole()
  const userActivated = Auth.getUser().verified
  console.log("verified: ", userActivated)
  let isAuthenticated = Auth.authenticated()

  const loginRequired = !publicSite.includes(to.path);
  const adminPath = adminSite.includes(to.path);
  const userPath = userSite.includes(to.path)
  
  //console.log(isAuthenticated, userRole, adminPath)
  if (!isAuthenticated && loginRequired) {
    next("/login");
  } else if (userActivated == 0) {
    next("/verify")
  } else if (isAuthenticated && !loginRequired && userActivated != 0){
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
 */
export default router;
