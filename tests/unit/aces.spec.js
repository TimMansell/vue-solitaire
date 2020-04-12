import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Aces from '@/components/Aces.vue';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Aces.vue', () => {
  it('matches snapshot', () => {
    const getters = {
      aces: () => ({
        c: [{
          suit: 'c',
          value: 'A',
        }],
        h: [{
          suit: 'h',
          value: 'A',
        }],
        d: [{
          suit: 'd',
          value: 'A',
        }],
        s: [{
          suit: 's',
          value: 'A',
        }],
      }),
    };

    const store = new Vuex.Store({
      getters,
    });

    const wrapper = shallowMount(Aces, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });

  it('calls store action "moveCardToAce" when clicked', () => {
    const getters = {
      aces: () => state.board.aces,
    };

    const actions = {
      moveCardToAce: jest.fn(),
    };

    const store = new Vuex.Store({
      getters,
      actions,
    });

    const wrapper = shallowMount(Aces, { store, localVue });

    wrapper.find('[data-test="ace"]').trigger('click');

    expect(actions.moveCardToAce).toHaveBeenCalled();
  });
});
