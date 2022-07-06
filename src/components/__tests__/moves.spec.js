import { shallowMount } from '@vue/test-utils';
import Moves from '@/components/Moves.vue';
import { setupStore } from '@@/tests/helpers';

describe('Moves.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Moves, {
      global: {
        mocks: {
          $store: setupStore({
            moves: 1,
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
