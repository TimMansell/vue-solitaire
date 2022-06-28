import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Columns from '@/components/Columns.vue';
import { setupStore } from '@@/tests/helpers';

describe('Columns.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Columns, {
      global: {
        mocks: {
          $store: setupStore({
            cards: [[], [], [], [], [], [], [], []],
            draggedCardsIDs: [],
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
