import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Header from "./components/heads/header.vue";
import Barnar from "./components/barnar/barnar.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./util/rem";
import "./util/base.css";
import VueLazyload from "vue-lazyload";
import uploader from "vue-simple-uploader";
import vshare from "vshare";
Vue.use(vshare);
Vue.use(uploader);
Vue.use(VueLazyload);
// import axios from './api/myAxios'
import { getHttp, postHttp } from "./api/ajax";

Vue.prototype.$getHttp = getHttp;
Vue.prototype.$postHttp = postHttp;
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios
Vue.component("Header", Header);
Vue.component("Barnar", Barnar);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  // loading: 'dist/loading.gif',
  attempt: 1
});

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
