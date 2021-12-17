import { shallowMount } from '@vue/test-utils';
import LeaderboardsButton from '@/components/LeaderboardsButton.vue';

describe('LeaderboardsButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(LeaderboardsButton, {
      computed: {
        isEmptyBoard: () => false,
        isOnline: () => true,
        isGamePaused: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
