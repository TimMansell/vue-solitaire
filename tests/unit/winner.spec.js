import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Winner from '@/components/Winner.vue';
import state from '@/store/state';
import getters from '@/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Card.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(Winner);

    expect(wrapper).toMatchSnapshot();
  });

  it('should not call store action "setGameWon" when clicked', () => {
    const actions = {
      setGameWon: jest.fn(),
    };

    const store = new Vuex.Store({
      state,
      getters,
      actions,
    });

    const wrapper = shallowMount(Winner, {
      store,
      localVue,
    });

    wrapper.find('[data-test="winner-btn"]').trigger('click');

    expect(actions.setGameWon).toHaveBeenCalled();
  });
});
