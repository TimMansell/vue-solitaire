import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import UserGames from '@/components/UserGames.vue';
import { setupStore } from '@@/tests/helpers';

describe('UserGames.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(UserGames, {
      global: {
        mocks: {
          $store: setupStore({
            userGameCount: 1,
          }),
        },
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });
});
