import VueRouter from 'vue-router';
import store from '@/store';
import Home from '@/pages/Home.vue';

const New = () => import('@/pages/New.vue');
const Pause = () => import('@/pages/Pause.vue');
const History = () => import('@/pages/History.vue');
const Stats = () => import('@/pages/Stats.vue');
const Leaderboards = () => import('@/pages/Leaderboards.vue');
const Won = () => import('@/pages/Won.vue');
const Lost = () => import('@/pages/Lost.vue');
const Rules = () => import('@/pages/Rules.vue');
const Update = () => import('@/pages/Update.vue');
const PageNotFound = () => import('@/pages/PageNotFound.vue');
const ConnectionError = () => import('@/pages/ConnectionError.vue');

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
      overlay: Rules,
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
      overlay: ConnectionError,
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
      overlay: Update,
    },
    beforeEnter(to, from, next) {
      if (store.getters.isOldVersion) {
        next();
      } else {
        next('/');
      }
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
  mode: 'history',
  routes,
});

router.afterEach((to) => {
  store.dispatch('setGamePaused', true);

  if (to.path === '/') {
    store.dispatch('setGamePaused', false);
  }
});

export default router;
