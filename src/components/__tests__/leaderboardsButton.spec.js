import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LeaderboardsButton from '@/components/LeaderboardsButton.vue';

describe('LeaderboardsButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(LeaderboardsButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
