import { shallowMount } from '@vue/test-utils';
import Table from '@/components/Table.vue';

describe('Table.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        headings: ['Heading 1', 'Heading 2', 'Heading 3'],
        items: [
          [1, 2, 3],
          [4, 5, 6],
        ],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
