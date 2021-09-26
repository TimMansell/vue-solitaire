import { shallowMount } from '@vue/test-utils';
import Table, { isRowHighlighted } from '@/components/Table.vue';

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

  it('should return highlighted row', () => {
    const result = isRowHighlighted([1, 2, 3], { key: '0', value: 1 });

    expect(result).toBe(true);
  });

  it('should not return highlighted row', () => {
    const result = isRowHighlighted([1, 2, 3], { key: '0', value: 2 });

    expect(result).toBe(false);
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

  it('should show highlight correct row', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        ...propsData,
        toHighlight: { key: '0', value: 1 },
      },
    });

    expect(
      wrapper.findAll('[data-test="table-row"]').at(0).classes()
    ).toContain('table__row--highlighted');
  });
});
