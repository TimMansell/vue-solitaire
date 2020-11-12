import Vue from 'vue';
import VModal from 'vue-js-modal';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VModal);

const app = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// only available during E2E tests
if (window.Cypress) {
  window.app = app;
}
