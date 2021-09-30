import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import Home from '@/pages/Home.vue';
import New from '@/pages/New.vue';
import Pause from '@/pages/Pause.vue';
import Games from '@/pages/Games.vue';
import Stats from '@/pages/Stats.vue';
import Leaderboards from '@/pages/Leaderboards.vue';
import Rules from '@/pages/Rules.vue';
import Won from '@/pages/Won.vue';
import Lost from '@/pages/Lost.vue';
import PageNotFound from '@/pages/PageNotFound.vue';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      main: Home,
    },
  },
  {
    path: '/new',
    components: {
      main: Home,
      overlay: New,
    },
  },
  {
    path: '/pause',
    components: {
      main: Home,
      overlay: Pause,
    },
  },
  {
    path: '/games',
    components: {
      main: Home,
      overlay: Games,
    },
  },
  {
    path: '/stats',
    components: {
      main: Home,
      overlay: Stats,
    },
  },
  {
    path: '/leaderboards',
    components: {
      main: Home,
      overlay: Leaderboards,
    },
  },
  {
    path: '/rules',
    components: {
      main: Home,
      overlay: Rules,
    },
  },
  {
    path: '/won',
    components: {
      main: Home,
      overlay: Won,
    },
  },
  {
    path: '/lost',
    components: {
      main: Home,
      overlay: Lost,
    },
  },
  {
    path: '*',
    components: {
      main: PageNotFound,
    },
  },
];

const router = new VueRouter({
  routes,
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
