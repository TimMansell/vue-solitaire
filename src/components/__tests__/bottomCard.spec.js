import { shallowMount } from '@vue/test-utils';
import BottomCard from '@/components/BottomCard.vue';

const computed = {
  isGamePaused: () => false,
};

describe('BottomCard.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(BottomCard, { computed });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      id: 1,
      value: 'J♣',
    };

    const wrapper = shallowMount(BottomCard, {
      propsData,
      computed,
    });

    expect(wrapper.props().id).toBe(1);
    expect(wrapper.props().value).toBe(propsData.value);
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
      computed,
    });

    wrapper.vm.autoMoveCard();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should not call autoMoveCard method when game is paused', () => {
    const mockStore = { dispatch: jest.fn() };

    const wrapper = shallowMount(BottomCard, {
      mocks: {
        $store: mockStore,
      },
      propsData: {
        disabled: false,
      },
      computed: {
        isGamePaused: () => true,
      },
    });

    wrapper.vm.autoMoveCard();

    expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
  });
});
