import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';

describe('Column.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Column, {
      computed: {
        selectedCardId: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      cards: [
        {
          value: 'K',
          suit: 'd',
          order: 1,
          visible: true,
          clickable: false,
        },
      ],
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
});
