/*
 =========================================================
 * Vue Black Dashboard - v1.1.3
 =========================================================

 * Product Page: https://www.creative-tim.com/product/black-dashboard
 * Copyright 2024 Creative Tim (http://www.creative-tim.com)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import { createApp } from "vue";
import App from "./App";
// TIP: change to import router from "./router/starterRouter"; to start with a clean layout
import router from "./router/index";
import store from "./store";
import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n";
import "./registerServiceWorker";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(BlackDashboard);

app.mount("#app");
