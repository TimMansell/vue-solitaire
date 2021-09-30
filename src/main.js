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
    redirect: '/games/1/25',
  },
  {
    path: '/games/:page/:limit',
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
    redirect: '/leaderboards/moves/25',
  },
  {
    path: '/leaderboards/:showBest/:limit',
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
    beforeEnter(to, from, next) {
      if (store.getters.hasGameWon) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/lost',
    components: {
      main: Home,
      overlay: () => import('@/pages/Lost.vue'),
    },
    beforeEnter(to, from, next) {
      if (store.getters.hasGameLost) {
        next();
      } else {
        next('/');
      }
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

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    store.dispatch('setGamePaused', false);
  } else {
    store.dispatch('setGamePaused', true);
  }

  next();
});

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
