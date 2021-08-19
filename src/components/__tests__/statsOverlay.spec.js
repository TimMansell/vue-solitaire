import { shallowMount } from '@vue/test-utils';
import StatsOverlay, {
  calcPercent,
  calcStats,
} from '@/components/StatsOverlay.vue';

import { mockStats } from '@/mockData';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const computed = {
  userStats: () => ({
    ...mockStats,
  }),
  globalStats: () => ({
    ...mockStats,
  }),
};

describe('StatsOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(StatsOverlay, {
      computed,
      mocks,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should calculate correct % values', () => {
    const result = calcPercent(1 / 2);

    expect(result).toBe('50.00%');
  });

  it('should calculate correct stats', () => {
    const result = calcStats(mockStats);

    expect(result).toStrictEqual([
      ['9', '2', '4', '3'],
      ['', '22.22%', '44.44%', '33.33%'],
    ]);
  });
});
