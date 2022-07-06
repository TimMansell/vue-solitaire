import { shallowMount } from '@vue/test-utils';
import GameStats from '@/components/GameStats.vue';

describe('GameStats.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GameStats);

    expect(wrapper.isVisible()).toBe(true);
  });
});
