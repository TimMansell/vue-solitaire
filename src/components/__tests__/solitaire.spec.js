import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Solitaire from '@/components/Solitaire.vue';
import state from '@/store/solitaire/state';
import getters from '@/store/solitaire/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Solitaire.vue', () => {
  let store;

  const actions = {
    initGame: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      actions,
      getters,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Solitaire, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });
});
