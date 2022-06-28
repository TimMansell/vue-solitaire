import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import HomeButton from '@/components/HomeButton.vue';

describe('HomeButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(HomeButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
