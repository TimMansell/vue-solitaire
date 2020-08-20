import { shallowMount } from '@vue/test-utils';
import BottomCard from '@/components/BottomCard.vue';

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
    const mockStore = { dispatch: jest.fn() };

    const wrapper = shallowMount(BottomCard, {
      mocks: {
        $store: mockStore,
      },
      propsData: {
        disabled: false,
      },
    });

    wrapper.vm.autoMoveCard();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
