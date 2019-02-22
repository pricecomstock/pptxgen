import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import store from "./store";
import "./scss/pcstyles.scss";
// import 'bulma-switch'
import "@fortawesome/fontawesome-free/css/all.min.css";

import "animate.css";
// import "vue-chartist"

Vue.config.productionTip = false;

new Vue({
  router,
  // store,
  render: h => h(App)
}).$mount("#app");
