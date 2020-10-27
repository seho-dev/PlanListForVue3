import { createApp } from "vue";
import App from "./App.vue";
import Router from "./router";
import Vuex from "./store";
import Vant from "vant";
import "vant/lib/index.css";

createApp(App).use(Router).use(Vant).use(Vuex).mount("#app");
