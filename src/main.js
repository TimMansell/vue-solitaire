import Vue from 'vue';
import VModal from 'vue-js-modal';
import VueGtag from 'vue-gtag';
import App from './App.vue';
import store from './store';
import apollo from './apolloClient';

Vue.config.productionTip = false;
Vue.prototype.$apollo = apollo;

Vue.use(VModal);

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_ANALYTICS_UA },
});

const app = new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');

// only available during E2E tests
if (window.Cypress) {
  window.app = app;
}
