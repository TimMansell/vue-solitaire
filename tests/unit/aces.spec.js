import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Aces from '@/components/Aces.vue';
import state from '@/store/state';
import getters from '@/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Aces.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Aces, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });
});
