import { shallowMount } from '@vue/test-utils';
import GameSummary from '@/components/GameSummary.vue';

describe('GameSummary.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(GameSummary, {
      computed: {
        timer: () => 3,
        moves: () => 10,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
