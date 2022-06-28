import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Players from '@/components/Players.vue';
import { setupStore } from '@@/tests/helpers';

const defaultGetters = { playerCount: 1, onlinePlayerCount: 1 };

const global = {
  mocks: {
    $store: setupStore(defaultGetters),
  },
};

describe('Players.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Players, {
      global,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should show 1 player online in title', () => {
    const wrapper = shallowMount(Players, {
      global,
    });

    expect(
      wrapper.find('[data-test="online-title"]').attributes().title
    ).toContain('1 player online');
  });

  it('should show 2 players online in title', () => {
    const wrapper = shallowMount(Players, {
      global: {
        mocks: {
          $store: setupStore({ ...defaultGetters, onlinePlayerCount: 2 }),
        },
      },
    });

    expect(
      wrapper.find('[data-test="online-title"]').attributes().title
    ).toContain('2 players online');
  });
});
