import { shallowMount } from '@vue/test-utils';
import StatsOverlay from '@/components/StatsOverlay.vue';

const mocks = {
  $store: { dispatch: jest.fn() },
};

const computed = {
  fullStats: () => ({
    count: 10,
    won: 2,
    lost: 4,
    completed: 9,
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

  it('calculate correct % values', () => {
    const wrapper = shallowMount(StatsOverlay, {
      computed,
      mocks,
    });

    expect(wrapper.vm.won.percent).toBe('22.22%');
    expect(wrapper.vm.lost.percent).toBe('44.44%');
    expect(wrapper.vm.abandoned.percent).toBe('33.33%');
  });

  it('calculates correct count values', () => {
    const wrapper = shallowMount(StatsOverlay, {
      computed,
      mocks,
    });

    expect(wrapper.vm.played).toBe(10);
    expect(wrapper.vm.completed).toBe(9);
    expect(wrapper.vm.won.count).toBe(2);
    expect(wrapper.vm.lost.count).toBe(4);
    expect(wrapper.vm.abandoned.count).toBe(3);
  });

  it('calculates progress correctly', () => {
    const wrapper = shallowMount(StatsOverlay, {
      computed,
      mocks,
    });

    expect(wrapper.vm.progress).toBe(1);
  });
});
