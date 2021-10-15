import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';

import { mockStats } from '@/mockData';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const computed = {
  userStats: () => [
    {
      ...mockStats,
    },
  ],
  globalStats: () => [
    {
      ...mockStats,
    },
  ],
};

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      computed,
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });
});
