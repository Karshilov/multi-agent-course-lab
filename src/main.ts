import { createApp } from "vue";
import App from "./App.vue";
import FullConnection from "./pages/FullConnection.vue";
import NeighboorConnection from "./pages/NeighboorConnection.vue";
import RandomConnection from "./pages/RandomConnection.vue";
import LinearThreshold from "./pages/LinearThreshold.vue";
import SIRSModel from "./pages/SIRSModel.vue";
import Home from "./pages/Home.vue";
import { createRouter, createWebHistory } from "vue-router";
import Starport from "vue-starport";

const routes = [
  { path: "/full-connection", component: FullConnection },
  { path: "/neighboor-connection", component: NeighboorConnection },
  { path: "/random-connection", component: RandomConnection },
  { path: "/sirs-model", component: SIRSModel },
  { path: "/linear-threshold", component: LinearThreshold },
  { path: "/", component: Home },
];

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
app.use(router);
app.use(Starport({ keepAlive: true }));
app.mount("#app");
