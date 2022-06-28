import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ResumeGameButton from '@/components/ResumeGameButton.vue';

describe('ResumeGameButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ResumeGameButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
