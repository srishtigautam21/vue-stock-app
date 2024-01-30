import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import "./styles/app.css";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.mount("#app");
