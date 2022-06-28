import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ContinueGameButton from '@/components/ContinueGameButton.vue';

describe('ContinueGameButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ContinueGameButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
