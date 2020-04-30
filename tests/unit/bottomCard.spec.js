import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import BottomCard from '@/components/BottomCard.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('BottomCard.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(BottomCard);

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(BottomCard, {
      propsData: {
        id: 1,
        value: 'J',
        suit: 'c',
      },
    });

    expect(wrapper.props().id).toBe(1);
    expect(wrapper.props().value).toBe('J');
    expect(wrapper.props().suit).toBe('c');
  });

  it('should call autoMoveCard method', () => {
    const actions = {
      autoMoveCardToFoundation: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
    });

    const wrapper = shallowMount(BottomCard, {
      store,
      localVue,
      propsData: {
        disabled: false,
      },
    });

    wrapper.vm.autoMoveCard();

    expect(actions.autoMoveCardToFoundation).toHaveBeenCalled();
  });
});
