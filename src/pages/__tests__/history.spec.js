import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import History from '@/pages/History.vue';
import { setupStore } from '@@/tests/helpers';

describe('History.vue', () => {
  describe('no games', () => {
    const global = {
      mocks: {
        $store: setupStore({
          userGameCount: 0,
          isOverlayVisible: true,
        }),
      },
      stubs: { GameOverlay: false },
    };

    it('renders the component without crashing', () => {
      const wrapper = shallowMount(History, {
        global,
      });

      expect(wrapper.isVisible()).toBe(true);
    });

    it('should show no games message', () => {
      const wrapper = mount(History, {
        shallow: true,
        global,
      });

      expect(wrapper.findComponent({ name: 'NoGames' }).exists()).toBe(true);
    });
  });

  describe('games', () => {
    const global = {
      mocks: {
        $store: setupStore({
          userGameCount: 4,
          isOverlayVisible: true,
        }),
      },
    };

    it('renders the component without crashings', () => {
      const wrapper = shallowMount(History, {
        global,
      });

      expect(wrapper.isVisible()).toBe(true);
    });

    it('should not show no games message', () => {
      const wrapper = mount(History, {
        shallow: true,
        global,
      });

      expect(wrapper.findComponent({ name: 'NoGames' }).exists()).toBe(false);
    });
  });
});
