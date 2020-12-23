import { shallowMount } from '@vue/test-utils';
import DraggedCards from '@/components/DraggedCards.vue';

const defaultProps = {
  width: 100,
};

const computed = {
  draggedCards: () => [
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
};

describe('DraggedCards.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(DraggedCards, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(DraggedCards, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    expect(wrapper.props().width).toBe(defaultProps.width);
  });

  it('should calculate card offset correctly', () => {
    const wrapper = shallowMount(DraggedCards, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    expect(wrapper.vm.cardOffset).toBe(50);
  });

  it.only('should calculate card position correctly', async () => {
    const wrapper = shallowMount(DraggedCards, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    await wrapper.setData({ x: 50, y: 100 });

    expect(wrapper.vm.cardPosition).toEqual({ leftOffset: 0, topOffset: 80 });
  });
});
