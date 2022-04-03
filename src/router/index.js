import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/pages/Home.vue';
import New from '@/pages/New.vue';
import Pause from '@/pages/Pause.vue';
import History from '@/pages/History.vue';
import Stats from '@/pages/Stats.vue';
import Leaderboards from '@/pages/Leaderboards.vue';
import Won from '@/pages/Won.vue';
import Lost from '@/pages/Lost.vue';

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
      overlay: Won,
    },
    beforeEnter(to, from, next) {
      if (store.getters.hasGameWon) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/lost',
    components: {
      main: Home,
      overlay: Lost,
    },
    beforeEnter(to, from, next) {
      if (store.getters.hasGameLost) {
        next();
      } else {
        next(false);
      }
    },
  },
  {
    path: '/connection-error',
    name: 'connection-error',
    components: {
      main: Home,
      overlay: () => import('@/pages/ConnectionError.vue'),
    },
    beforeEnter(to, from, next) {
      if (store.getters.hasConnectionError) {
        next();
      } else {
        next('/');
      }
    },
  },
  {
    path: '/update',
    components: {
      main: Home,
      overlay: () => import('@/pages/Update.vue'),
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
  const { isOldVersion } = store.getters;

  if (!isOldVersion && to.path.includes('update')) {
    next('/');
    return;
  }

  if (isOldVersion && from.path.includes('update')) {
    next(false);
    return;
  }

  next();
});

router.afterEach((to) => {
  store.dispatch('setGamePaused', true);

  if (to.path === '/') {
    store.dispatch('setGamePaused', false);
  }
});

export default router;
