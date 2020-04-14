import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';

Vue.config.productionTip = false;

const app = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// only available during E2E tests
if (window.Cypress) {
  window.app = app;
}
