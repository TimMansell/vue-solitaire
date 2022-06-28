import { describe, it, expect } from 'vitest';
import { shallowMount, config } from '@vue/test-utils';
import ShowBoardButton from '@/components/ShowBoardButton.vue';
import { setupStore } from '@@/tests/helpers';

config.renderStubDefaultSlot = true;

const global = {
  mocks: {
    $store: setupStore({ isOverlayVisible: true }),
  },
};

describe('ShowBoardButton.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      global,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should contain show board', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      global,
    });

    expect(wrapper.text()).toEqual('Show Board');
  });

  it('should contain hide board', () => {
    const wrapper = shallowMount(ShowBoardButton, {
      global: {
        mocks: {
          $store: setupStore({ isOverlayVisible: false }),
        },
      },
    });

    expect(wrapper.text()).toEqual('Hide Board');
  });
});
