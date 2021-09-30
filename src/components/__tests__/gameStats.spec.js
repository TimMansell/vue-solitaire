import { shallowMount } from '@vue/test-utils';
import GameStats from '@/components/GameStats.vue';

describe('GameStats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameStats, {
      computed: {
        timer: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
