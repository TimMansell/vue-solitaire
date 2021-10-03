import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/pages/Home.vue';
import New from '@/pages/New.vue';
import Pause from '@/pages/Pause.vue';
import History from '@/pages/History.vue';
import Stats from '@/pages/Stats.vue';
import Leaderboards from '@/pages/Leaderboards.vue';

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
    path: '/history',
    redirect: '/history/1/25',
  },
  {
    path: '/history/:page/:limit',
    components: {
      main: Home,
      overlay: History,
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
    redirect: '/leaderboards/moves/25',
  },
  {
    path: '/leaderboards/:showBest/:limit',
    components: {
      main: Home,
      overlay: Leaderboards,
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
  const { isGameLoading, isGamePaused } = store.getters;

  if (to.path === '/' && !isGameLoading) {
    store.dispatch('setGamePaused', false);

    return;
  }

  if (!isGamePaused) {
    store.dispatch('setGamePaused', true);
  }
});

export default router;
