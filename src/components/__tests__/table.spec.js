import { shallowMount } from '@vue/test-utils';
import Table from '@/components/Table.vue';

const propsData = {
  headings: ['Heading 1', 'Heading 2', 'Heading 3'],
  items: [
    [1, 2, 3],
    [4, 5, 6],
  ],
};

describe('Table.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Table, {
      propsData,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot - placeholder rows', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        ...propsData,
        items: [],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should show placeholder rows', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        ...propsData,
        items: [],
      },
    });

    expect(wrapper.find('[data-test="table-placeholder-row"]').exists()).toBe(
      true
    );

    expect(wrapper.find('[data-test="table-row"]').exists()).toBe(false);
  });

  it('should not show placeholder rows', () => {
    const wrapper = shallowMount(Table, {
      propsData,
    });

    expect(wrapper.find('[data-test="table-placeholder-row"]').exists()).toBe(
      false
    );

    expect(wrapper.find('[data-test="table-row"]').exists()).toBe(true);
  });
});
