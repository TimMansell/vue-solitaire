import db from '@/services/db';

const actions = {
  async initGlobalStats({ commit }) {
    const { error, response } = await db.getGlobalStats();

    if (!error) {
      commit('SET_GLOBAL_STATS', { ...response });
    }
  },
};

export default actions;
