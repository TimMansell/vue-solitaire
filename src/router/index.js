import { createRouter, createWebHistory } from 'vue-router';
import { store } from '@/store';
import Home from '@/pages/Home.vue';
import New from '@/pages/New.vue';
import Pause from '@/pages/Pause.vue';
import History from '@/pages/History.vue';
import Stats from '@/pages/Stats.vue';
import Leaderboards from '@/pages/Leaderboards.vue';
import ConnectionError from '@/pages/ConnectionError.vue';
import Won from '@/pages/Won.vue';
import Lost from '@/pages/Lost.vue';
import Rules from '@/pages/Rules.vue';
import Update from '@/pages/Update.vue';
import PageNotFound from '@/pages/PageNotFound.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      main: Home,
    },
  },
  {
    path: '/new',
    name: 'new',
    components: {
      main: Home,
      overlay: New,
    },
  },
  {
    path: '/pause',
    name: 'pause',
    components: {
      main: Home,
      overlay: Pause,
    },
  },
  {
    path: '/history',
    name: 'history',
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
    name: 'stats',
    components: {
      main: Home,
      overlay: Stats,
    },
  },
  {
    path: '/leaderboards',
    name: 'leaderboards',
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
    name: 'rules',
    components: {
      main: Home,
      overlay: Rules,
    },
  },
  {
    path: '/won',
    name: 'won',
    components: {
      main: Home,
      overlay: Won,
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
    path: '/lost/:show?',
    name: 'lost',
    components: {
      main: Home,
      overlay: Lost,
    },
    props: { overlay: true },
    beforeEnter(to, from, next) {
      if (store.getters.hasGameLost) {
        next();
      } else {
        next('/');
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
    name: 'update',
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
    path: '/:pathMatch(.*)*',
    components: {
      main: PageNotFound,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to) => {
  store.dispatch('setGamePaused', true);

  if (to.path === '/') {
    store.dispatch('setGamePaused', false);
  }
});

export default router;
