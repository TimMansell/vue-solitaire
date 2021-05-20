import { shallowMount } from '@vue/test-utils';
import ResponsiveTable from '@/components/ResponsiveTable.vue';

const propsData = {
  headings: ['Heading 1', 'Heading 2', 'Heading 3'],
  items: [
    [1, 2, 3],
    [4, 5, 6],
  ],
};

describe('ResponsiveTable.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ResponsiveTable, {
      propsData,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('does not show table helper', () => {
    localStorage.setItem('showTableHelper', 'false');

    const wrapper = shallowMount(ResponsiveTable, {
      propsData,
    });

    expect(wrapper.find('[data-test="responsive-table-helper"]').exists()).toBe(
      false
    );
  });
});
