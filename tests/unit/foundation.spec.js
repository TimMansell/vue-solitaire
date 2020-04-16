import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Foundation from '@/components/Foundation.vue';
// import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Foundation.vue', () => {
  it('matches snapshot', () => {
    const getters = {
      foundationCards: () => ([{
        value: 'A',
        order: 1,
        suit: 's',
        position: [7, 5],
        visible: true,
      }]),
    };

    const store = new Vuex.Store({
      getters,
    });

    const wrapper = shallowMount(Foundation, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });

  it('calls store action "moveCardToFoundation" when clicked', () => {
    const getters = {
      foundationCards: () => ([{
        value: 'A',
        order: 1,
        suit: 's',
        position: [7, 5],
        visible: true,
      }]),
    };

    const actions = {
      moveCardToFoundation: jest.fn(),
    };

    const store = new Vuex.Store({
      getters,
      actions,
    });

    const wrapper = shallowMount(Foundation, { store, localVue });

    wrapper.find('[data-test="foundation-0"]').trigger('click');

    expect(actions.moveCardToFoundation).toHaveBeenCalled();
  });
});
