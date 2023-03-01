import { createApp } from "vue";
import { App } from "./App";
import { createRouter } from "vue-router";
import { routes } from "./config/routes";
import { history } from "./shared/history";
import "@svgstore";
import { fetchMe, mePromise } from "./shared/me";

const router = createRouter({ history, routes });

fetchMe();

router.beforeEach((to, from) => {
  if (
    to.path === "/" ||
    to.path.startsWith("/welcome") ||
    to.path.startsWith("/sign_in") ||
    to.path.startsWith("/start")
  ) {
    return true;
  } else {
    return mePromise!.then(
      () => true,
      () => "/sign_in?return_to=" + to.path
    );
  }
});
const app = createApp(App);
app.use(router);
app.mount("#app");

