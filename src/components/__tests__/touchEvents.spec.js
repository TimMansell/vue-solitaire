import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import TouchEvents from '@/components/TouchEvents.vue';

describe('TouchEvents.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(TouchEvents);

    expect(wrapper.isVisible()).toBe(true);
  });
});
