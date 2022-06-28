import { shallowMount } from '@vue/test-utils';
import Foundation from '@/components/Foundation.vue';
import { setupStore } from '@@/tests/helpers';

const defaultGetters = {
  foundation: [
    [
      {
        id: 0,
        value: 'A',
        order: 1,
        suit: '♠',
        visible: true,
      },
    ],
    [],
    [
      {
        id: 1,
        value: 'A',
        order: 1,
        suit: '♦',
        visible: true,
      },
    ],
    [],
  ],
};

describe('Foundation.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Foundation, {
      global: {
        mocks: {
          $store: setupStore(defaultGetters),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('calls store action "moveCardToFoundation" when clicked', () => {
    const spy = vi.fn();
    const wrapper = shallowMount(Foundation, {
      global: {
        mocks: {
          $store: setupStore({
            dispatch: spy,
            ...defaultGetters,
          }),
        },
      },
    });

    wrapper.find('[data-test="foundation-0"]').trigger('click');

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
