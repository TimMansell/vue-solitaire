import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import store from '@/store';
import router from '@/router';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const solitaire = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');

// Give access to cypress.
if (import.meta.env.DEV) {
  window.solitaire = solitaire;
}
