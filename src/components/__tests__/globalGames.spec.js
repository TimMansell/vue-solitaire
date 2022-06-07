import { shallowMount } from '@vue/test-utils';
import GlobalGames from '@/components/GlobalGames.vue';
import { setupStore } from '@@/tests/helpers';

describe('GlobalGames.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GlobalGames, {
      global: {
        mocks: {
          $store: setupStore({
            globalGameCount: 1,
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
