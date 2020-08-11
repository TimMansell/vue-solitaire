import state from './state';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

const userModule = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};

export default userModule;
