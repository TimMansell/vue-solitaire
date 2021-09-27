import Vue from 'vue';
import App from './App.vue';
import store from './store';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
