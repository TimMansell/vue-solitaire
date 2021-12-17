import { shallowMount } from '@vue/test-utils';
import LeaderboardsButton from '@/components/LeaderboardsButton.vue';

describe('LeaderboardsButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(LeaderboardsButton, {
      computed: {
        hasCards: () => true,
        isOnline: () => true,
        isGamePaused: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
