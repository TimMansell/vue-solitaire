import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/pages/Home.vue';

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
    path: '/history',
    redirect: '/history/1/25',
  },
  {
    path: '/history/:page/:limit',
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
      if (store.getters.gameOutcome.hasGameWon) {
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
      if (store.getters.gameOutcome.hasGameLost) {
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

router.afterEach((to) => {
  if (to.path === '/') {
    store.dispatch('setGamePaused', false);
  } else {
    store.dispatch('setGamePaused', true);
  }
});

export default router;
