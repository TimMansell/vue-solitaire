import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Card from '@/components/Card.vue';
import state from '@/store/state';
import getters from '@/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Card.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Card, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });
});
