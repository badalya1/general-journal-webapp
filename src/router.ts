import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/transactions",
    name: "transactions",
    component: () => import("./views/Transactions.vue"),
  },
  {
    path: "/calendar",
    name: "calendar",
    component: () => import("./views/Calendar.vue"),
  },
  {
    path: "/scheduler",
    name: "scheduler",
    component: () => import("./views/Scheduler.vue"),
  },
  {
    path: "/events",
    name: "events",
    component: () => import("./views/Events.vue"),
  },
  {
    path: "/budgets",
    name: "budgets",
    component: () => import("./views/Budgets.vue"),
  },
  {
    path: "/reports",
    name: "reports",
    component: () => import("./views/Reports.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
