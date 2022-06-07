import { shallowMount } from '@vue/test-utils';
import BottomCard from '@/components/BottomCard.vue';
import { setupStore } from '@@/tests/helpers';

describe('BottomCard.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(BottomCard);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const props = {
      id: 1,
      value: 'J♣',
    };

    const wrapper = shallowMount(BottomCard, {
      props,
    });

    expect(wrapper.props().id).toBe(1);
    expect(wrapper.props().value).toBe(props.value);
  });

  it('should call autoMoveCard method', () => {
    const spy = jest.fn();
    const wrapper = shallowMount(BottomCard, {
      global: {
        mocks: {
          $store: setupStore({ dispatch: spy, isDisabledGame: false }),
        },
      },
    });

    wrapper.vm.autoMoveCard();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should not call autoMoveCard method when game is paused', () => {
    const spy = jest.fn();
    const wrapper = shallowMount(BottomCard, {
      global: {
        mocks: {
          $store: setupStore({ dispatch: spy, isDisabledGame: true }),
        },
      },
    });

    wrapper.vm.autoMoveCard();

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
