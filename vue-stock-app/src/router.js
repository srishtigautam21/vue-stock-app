import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./views/HomePage.vue"; // Import your views/components
import StockPage from "./views/StockPage.vue"; // Import your views/components

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/stock",
    name: "Stock",
    component: StockPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
