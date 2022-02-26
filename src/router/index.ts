import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "home-page" */ "../views/Home.vue"),
  },
  {
    name: "soldiersDetailPage",
    path: "/soldiers/:id",
    component: () =>
      import(
        /* webpackChunkName: "soldier-detail-page" */ "../views/SoldiersDetail.vue"
      ),
  },
  {
    name: "addSoldierPage",
    path: "/soldiers/add",
    component: () =>
      import(
        /* webpackChunkName: "add-soldier-page" */ "../views/AddSoldierView.vue"
      ),
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
  history: createWebHistory(process.env.BASE_URL || "/"),
  routes,
});
export default router;
