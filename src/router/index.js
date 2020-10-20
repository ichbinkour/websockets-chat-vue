import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: (to, from, next) => {
      if (store.state.user == null) {
        next("/login");
      } else {
        next();
      }
    }
  },
  {
    path: "/room/:id",
    name: "roomId",
    component: () => import("../views/Room.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      store.commit("setUser", null);
      next("/login");
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
