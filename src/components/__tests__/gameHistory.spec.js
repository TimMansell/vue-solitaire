import { describe, it, expect, vi } from 'vitest';
import { shallowMount, config } from '@vue/test-utils';
import GameHistory from '@/components/GameHistory.vue';
import { mockHistory } from '@/mockData';
import { setupStore, setupRoute } from '@@/tests/helpers';

config.renderStubDefaultSlot = true;

const global = {
  mocks: {
    $store: setupStore({
      dispatch: vi.fn(),
      gameHistory: mockHistory,
      userGameCount: mockHistory.length,
    }),
    $route: setupRoute({
      page: 1,
      limit: 25,
    }),
  },
};

describe('GameHistory.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should set default filters when route params are incorrect format', () => {
    const wrapper = shallowMount(GameHistory, {
      global: {
        mocks: {
          ...global.mocks,
          $route: setupRoute({
            page: 'abc',
            limit: 'abc',
          }),
        },
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      page: 1,
      limit: 25,
    });
  });

  it('should set default filters when route params are correct format but are out of bounds', () => {
    const wrapper = shallowMount(GameHistory, {
      global: {
        mocks: {
          ...global.mocks,
          $route: setupRoute({
            page: 5000,
            limit: 5000,
          }),
        },
      },
    });

    expect(wrapper.vm.filters).toStrictEqual({
      page: 1,
      limit: 25,
    });
  });

  it('should show correct completed games message', () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    expect(
      wrapper.find('[data-test="game-history-total-games"]').text()
    ).toContain('You have played a total of 4 games');
  });

  it('should show correct pages', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: 3 } });

    expect(wrapper.find('[data-test="game-history-pages"]').text()).toContain(
      'Page: 1 / 2'
    );
  });

  it('should show correct showing games message ', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: 3 } });

    expect(
      wrapper
        .find('[data-test="game-history-showing-games"]')
        .text()
        .replace(/\s+/g, ' ')
    ).toContain(`Showing games ${mockHistory.length} to 2`);
  });

  it('should show correct showing games message if on last page', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: mockHistory.length } });

    expect(
      wrapper
        .find('[data-test="game-history-showing-games"]')
        .text()
        .replace(/\s+/g, ' ')
    ).toContain(`Showing games ${mockHistory.length} to 1`);
  });

  it('should show correct placeholder rows', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: 2 } });

    expect(wrapper.vm.pageRows).toBe(2);
  });

  it('should show correct placeholder rows if rows are the same as limit', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: mockHistory.length } });

    expect(wrapper.vm.pageRows).toBe(mockHistory.length);
  });

  it('should show correct placeholder rows for last page', async () => {
    const wrapper = shallowMount(GameHistory, {
      global,
    });

    await wrapper.setData({ filters: { limit: 3, page: 2 } });

    expect(wrapper.vm.pageRows).toBe(1);
  });
});
