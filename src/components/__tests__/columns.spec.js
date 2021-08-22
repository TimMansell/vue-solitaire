import { shallowMount } from '@vue/test-utils';
import Columns from '@/components/Columns.vue';

describe('Columns.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Columns, {
      computed: {
        formattedCards: () => [[], [], [], [], [], [], [], []],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
