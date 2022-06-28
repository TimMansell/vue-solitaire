import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Won from '@/pages/Won.vue';

describe('Won.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Won);

    expect(wrapper.isVisible()).toBe(true);
  });
});
