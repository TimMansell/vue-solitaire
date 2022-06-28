import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Home from '@/pages/Home.vue';

describe('Home.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Home);

    expect(wrapper.isVisible()).toBe(true);
  });
});
