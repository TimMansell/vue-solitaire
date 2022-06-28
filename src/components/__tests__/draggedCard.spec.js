import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import DraggedCards from '@/components/DraggedCards.vue';
import { setupStore } from '@@/tests/helpers';

const props = {
  width: 100,
};

const global = {
  mocks: {
    $store: setupStore({
      draggedCards: [
        {
          id: 0,
          value: 'A',
          order: 1,
          suit: '♠',
          visible: true,
        },
        {
          id: 1,
          value: 'A',
          order: 1,
          suit: '♦',
          visible: true,
        },
      ],
    }),
  },
};

describe('DraggedCards.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(DraggedCards, {
      global,
      props,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(DraggedCards, {
      global,
      props,
    });

    expect(wrapper.props().width).toBe(props.width);
  });

  it('should calculate card offset correctly', () => {
    const wrapper = shallowMount(DraggedCards, {
      global,
      props,
    });

    expect(wrapper.vm.cardOffset).toBe(50);
  });

  it('should calculate card position correctly', async () => {
    const wrapper = shallowMount(DraggedCards, {
      global,
      props,
    });

    await wrapper.setData({ x: 50, y: 100 });

    expect(wrapper.vm.cardPosition).toEqual({ leftOffset: 0, topOffset: 100 });
  });
});
