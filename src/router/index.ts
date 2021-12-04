import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/",
    component: () =>
      import(
        /* webpackChunkName: "private-page" */ "../components/PrivatePage/PrivatePage.vue"
      ),
    children: [{ path: "/test", component: () => import("../views/Home.vue") }],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
