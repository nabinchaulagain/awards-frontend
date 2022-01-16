import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login-page" */ "../views/Login.vue"),
  },
  {
    path: "/Signup",
    name: "Signup",
    component: () =>
      import(/* webpackChunkName: "signup-page" */ "../views/Signup.vue"),
  },

  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "private-page" */ "../components/PrivatePage/PrivatePage.vue"
      ),
    children: [
      { path: "/units", component: () => import("../views/Units.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
