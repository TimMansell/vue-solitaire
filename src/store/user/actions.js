import { emitSocket, onSocket } from '@/services/websockets';
import { initUser } from '@/services/user';
import { getUsersGames } from '@/services/db';

const actions = {
  initUser({ commit, state }) {
    const { luid } = state;
    const uid = luid || initUser();

    emitSocket('getUser', luid);

    onSocket('setUser', (user) => {
      commit('SET_USER_NAME', user);
    });

    commit('SET_USER_ID', uid);

    return uid;
  },
  async getAllGames({ commit, state }, params) {
    const { luid } = state;

    commit('SET_USER_GAMES', []);

    const { history } = await getUsersGames(luid, params);

    commit('SET_USER_GAMES', history);
  },
};

export default actions;
