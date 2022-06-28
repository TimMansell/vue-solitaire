import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GameSummary from '@/components/GameSummary.vue';
import { setupStore } from '@@/tests/helpers';

describe('GameSummary.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GameSummary, {
      global: {
        mocks: {
          $store: setupStore({ timer: 3, moves: 10 }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
