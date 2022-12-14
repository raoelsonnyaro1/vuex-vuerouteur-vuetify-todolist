import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/completed",
    name: "completed",
    // route level code-splitting
    // this generates a separate chunk (completed.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(
        /* webpackChunkName: "completed" */ "../views/CompletedView.vue"
      );
    },
  },
  {
    path: "/todo/:id",
    name: "todo",
    // route level code-splitting
    // this generates a separate chunk (todo.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "todo" */ "../views/TodoView.vue");
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
