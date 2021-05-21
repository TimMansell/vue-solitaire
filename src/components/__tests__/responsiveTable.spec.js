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

  it('does not show table helper after first viewing of component', () => {
    shallowMount(ResponsiveTable, {
      propsData,
    }).destroy();

    const wrapper2 = shallowMount(ResponsiveTable, {
      propsData,
    });

    expect(
      wrapper2.find('[data-test="responsive-table-helper"]').exists()
    ).toBe(false);
  });
});
