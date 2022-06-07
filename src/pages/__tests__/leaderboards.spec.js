import { shallowMount } from '@vue/test-utils';
import Leaderboards from '@/pages/Leaderboards.vue';

describe('Leaderboards.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Leaderboards);

    expect(wrapper.isVisible()).toBe(true);
  });
});
