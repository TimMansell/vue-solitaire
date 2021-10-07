import Vue from 'vue';
import VueRouter from 'vue-router';
import Toasted from 'vue-toasted';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Toasted, {
  type: 'error',
  theme: 'bubble',
  position: 'bottom-center',
});

const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

window.app = app;
