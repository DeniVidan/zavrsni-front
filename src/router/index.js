import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GetStarted from "../views/GetStarted.vue";
import ChooseLogin from "../views/ChooseLogin.vue";
import LogIn from "../views/LogIn.vue";
import Register from "../views/Register.vue";

/* eslint-disable */
const routes = [
  {
    path: "/",
    name: "home",
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
