import { shallowMount } from '@vue/test-utils';
import Foundation from '@/components/Foundation.vue';

const computed = {
  foundationCards: () => [
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
  it('matches snapshot', () => {
    const wrapper = shallowMount(Foundation, {
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('calls store action "moveCardToFoundation" when clicked', () => {
    const mockStore = { dispatch: jest.fn() };

    const mocks = {
      $store: mockStore,
    };

    const wrapper = shallowMount(Foundation, {
      mocks,
      computed,
    });

    wrapper.find('[data-test="foundation-0"]').trigger('click');

    expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
  });
});
