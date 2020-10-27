import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login/Index.vue";
import Index from "../pages/Index/Index.vue";
const routerHistory = createWebHistory();
const Router = createRouter({
  history: routerHistory,
  routes: [
    {
      name: "Index",
      path: "/",
      component: Index
    },
    {
      name: "Login",
      path: "/Login",
      component: Login
    }
  ]
});

export default Router;
