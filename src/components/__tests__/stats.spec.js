import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Stats from '@/components/Stats.vue';
import state from '@/store/db/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Stats.vue', () => {
  let store;

  beforeEach(() => {
    const getters = {
      stats: () => ({
        totalGames: 1,
      }),
    };

    store = new Vuex.Store({
      state,
      getters,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      store,
      localVue,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show 1 game played', () => {
    const wrapper = shallowMount(Stats, {
      store,
      localVue,
    });

    expect(wrapper.text()).toContain('1');
  });
});
