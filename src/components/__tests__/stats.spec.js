import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';
import { mockStats } from '@/mockData';
import { setupStore } from '@@/tests/helpers';

describe('Stats.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Stats, {
      global: {
        mocks: {
          $store: setupStore({
            dispatch: jest.fn(),
            userStats: [{ ...mockStats }],
            globalStats: [{ ...mockStats }],
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
