import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Logo);

    expect(wrapper.isVisible()).toBe(true);
  });
});
