import Vue from "vue";
import Router from "vue-router";

//引入组件
import News from "../page/news/index.vue";
import User from "../page/user/index.vue";
import VueRouter from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      // path:浏览器访问显示路径，component：对应的组件名称
      path: "/news",
      component: News
    },
    {
      path: "/user",
      component: User
    },
    {
      path: "/",
      // 重定向，页面进入时进入news页面
      redirect: "/news"
    }
  ]
});
