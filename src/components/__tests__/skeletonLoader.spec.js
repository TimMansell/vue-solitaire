import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

describe('SkeletonLoader.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(SkeletonLoader);

    expect(wrapper.isVisible()).toBe(true);
  });
});
