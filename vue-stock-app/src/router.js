import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue"; // Import your views/components
// import StockPage from "./views/StockPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/stock/:symbol",
    name: "StockSearchResult",
    component: () => import("./views/StockPage.vue"),
    // StockPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
