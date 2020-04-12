import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Columns from '@/components/Columns.vue';
import state from '@/store/state';
import getters from '@/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Columns.vue', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Columns, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });
});
