import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import New from '@/pages/New.vue';
import Pause from '@/pages/Pause.vue';
import Games from '@/pages/Games.vue';
import Stats from '@/pages/Stats.vue';
import Leaderboards from '@/pages/Leaderboards.vue';
import Rules from '@/pages/Rules.vue';
import Won from '@/pages/Won.vue';
import Lost from '@/pages/Lost.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/new', component: New },
  { path: '/pause', component: Pause },
  { path: '/games', component: Games },
  { path: '/stats', component: Stats },
  { path: '/leaderboards', component: Leaderboards },
  { path: '/rules', component: Rules },
  { path: '/won', component: Won },
  { path: '/lost', component: Lost },
];

const router = new VueRouter({
  routes,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
