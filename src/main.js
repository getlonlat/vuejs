import Vue from "vue";
import App from "./App.vue";
import Clipboard from "v-clipboard";
import Toasted from "vue-toasted";
import VueSweetalert2 from "vue-sweetalert2";

import { store } from "./store";

import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(Clipboard);
Vue.use(Toasted, {
  position: "top-center",
  duration: 3000,
  singleton: true
});
Vue.use(VueSweetalert2);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_MAPS_API_KEY
  }
});

new Vue({
  store,
  render: h => h(App),
  filters: {
    json: value => {
      return JSON.stringify(value, null, 2);
    }
  }
}).$mount("#app");
