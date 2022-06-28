import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Board from '@/components/Board.vue';

describe('Board.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Board);

    expect(wrapper.isVisible()).toBe(true);
  });
});
