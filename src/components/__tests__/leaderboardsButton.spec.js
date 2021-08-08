import { shallowMount } from '@vue/test-utils';
import LeaderboardsButton from '@/components/LeaderboardsButton.vue';

describe('LeaderboardsButton.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(LeaderboardsButton);

    expect(wrapper).toMatchSnapshot();
  });
});
