// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import Axios from "axios";
import Router from "vue-router";
import ElementUI from "element-ui";
// import Layout from "./components/Layout.vue";
import "element-ui/lib/theme-chalk/index.css";
import "font-awesome/css/font-awesome.min.css";

Vue.use(Router);
Vue.use(ElementUI);
Vue.prototype.$axios = Axios;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  // 启用路由
  router,
  components: { App },
  template: "<App/>"
});
