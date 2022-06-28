import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import PauseGameButton from '@/components/PauseGameButton.vue';

describe('PauseGameButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(PauseGameButton);

    expect(wrapper.isVisible()).toBe(true);
  });
});
