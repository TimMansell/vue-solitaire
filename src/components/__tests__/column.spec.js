import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';
import { setupStore } from '@@/tests/helpers';

const defaultProps = {
  cards: [
    {
      id: 1,
      value: 'K',
      suit: '♦',
      order: 1,
      visible: true,
      clickable: false,
    },
  ],
};

const global = {
  mocks: {
    $store: setupStore({
      selectedCardId: 1,
      isEmptyBoard: false,
      placeholders: 1,
    }),
  },
};

describe('Column.vue', () => {
  it('renders the component without crashing', () => {
    const props = {
      ...defaultProps,
    };

    const wrapper = shallowMount(Column, {
      global,
      props,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const props = {
      ...defaultProps,
      columnNo: 1,
    };

    const wrapper = shallowMount(Column, {
      global,
      props,
    });

    expect(wrapper.props().cards).toStrictEqual(props.cards);
    expect(wrapper.props().columnNo).toBe(1);
  });

  it('should show placeholder card', () => {
    const props = {
      cards: [],
    };

    const wrapper = shallowMount(Column, {
      global,
      props,
    });

    expect(wrapper.findComponent({ name: 'Card' }).exists()).toBe(false);
    expect(wrapper.findComponent({ name: 'CardPlaceholder' }).exists()).toBe(
      true
    );
  });
});
