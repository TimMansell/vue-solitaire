import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import { getVersion } from '@/services/version';
import app from './app';
import connection from './connection';
import solitaire from './solitaire';
import user from './user';
import stats from './stats';

// eslint-disable-next-line import/prefer-default-export
export const store = createStore({
  modules: {
    app,
    connection,
    solitaire,
    user,
    stats,
  },
  plugins: [
    createPersistedState({
      key: `v${getVersion()}`,
      paths: ['solitaire', 'user', 'stats'],
    }),
  ],
});
