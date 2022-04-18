import Vue from "vue";
import "./plugins/axios";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import "./styles.scss";
import "./main.css";
import "bytemd/dist/index.min.css";

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
