import Vue from 'vue';
import VueRouter from 'vue-router';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

import App from '@/App.vue';
import Home from '@/pages/Home.vue';
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
      overlay: () => import('@/pages/New.vue'),
    },
  },
  {
    path: '/pause',
    components: {
      main: Home,
      overlay: () => import('@/pages/Pause.vue'),
    },
  },
  {
    path: '/games',
    components: {
      main: Home,
      overlay: () => import('@/pages/Games.vue'),
    },
  },
  {
    path: '/stats',
    components: {
      main: Home,
      overlay: () => import('@/pages/Stats.vue'),
    },
  },
  {
    path: '/leaderboards',
    components: {
      main: Home,
      overlay: () => import('@/pages/Leaderboards.vue'),
    },
  },
  {
    path: '/rules',
    components: {
      main: Home,
      overlay: () => import('@/pages/Rules.vue'),
    },
  },
  {
    path: '/won',
    components: {
      main: Home,
      overlay: () => import('@/pages/Won.vue'),
    },
  },
  {
    path: '/lost',
    components: {
      main: Home,
      overlay: () => import('@/pages/Lost.vue'),
    },
  },
  {
    path: '*',
    components: {
      main: () => import('@/pages/PageNotFound.vue'),
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
