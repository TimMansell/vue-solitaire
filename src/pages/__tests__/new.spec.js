import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import New from '@/pages/New.vue';
import { setupStore } from '@@/tests/helpers';

describe('New.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(New, {
      global: {
        mocks: {
          $store: setupStore({
            isOnline: true,
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
