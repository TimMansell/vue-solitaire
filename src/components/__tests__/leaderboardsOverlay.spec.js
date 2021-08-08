import { shallowMount } from '@vue/test-utils';
import LeaderboardsOverlay from '@/components/LeaderboardsOverlay.vue';

describe('LeaderboardsOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(LeaderboardsOverlay);

    expect(wrapper).toMatchSnapshot();
  });
});
