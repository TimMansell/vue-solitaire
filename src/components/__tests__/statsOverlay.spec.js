import { shallowMount } from '@vue/test-utils';
import StatsOverlay, {
  calcPercent,
  calcStats,
} from '@/components/StatsOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const fullStats = {
  completed: 9,
  won: 2,
  lost: 4,
};

const computed = {
  fullStats: () => ({
    ...fullStats,
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
    const result = calcStats(fullStats);

    expect(result).toStrictEqual([
      ['9', '2', '4', '3'],
      ['', '22.22%', '44.44%', '33.33%'],
    ]);
  });
});
