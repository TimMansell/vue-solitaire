import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';
import Card from '@/components/Card.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

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

describe('Column.vue', () => {
  it('matches snapshot', () => {
    const propsData = {
      ...defaultProps,
    };

    const wrapper = shallowMount(Column, {
      propsData,
      computed: {
        selectedCardId: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      ...defaultProps,
      columnNo: 1,
    };

    const wrapper = shallowMount(Column, {
      propsData,
      computed: {
        selectedCardId: () => 1,
      },
    });

    expect(wrapper.props().cards).toBe(propsData.cards);
    expect(wrapper.props().columnNo).toBe(1);
  });

  it('should show placeholder card', () => {
    const propsData = {
      cards: [],
    };

    const wrapper = shallowMount(Column, {
      propsData,
    });

    expect(wrapper.findComponent(Card).exists()).toBe(false);
    expect(wrapper.findComponent(CardPlaceholder).exists()).toBe(true);
  });
});
