import { shallowMount } from '@vue/test-utils';
import Table, { isRowHighlighted } from '@/components/Table.vue';

const propsData = {
  headings: ['Heading 1', 'Heading 2', 'Heading 3'],
  items: [
    ['Cell 1', 'Cell 2', 'Cell 3'],
    ['Cell 4', 'Cell 5', 'Cell 6'],
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

  it('should add spacing class', () => {
    const wrapper = shallowMount(Table, {
      propsData: {
        ...propsData,
        spacing: true,
      },
    });

    expect(wrapper.classes()).toContain('table--spacing');
  });

  it('should populate table headers correctly', () => {
    const wrapper = shallowMount(Table, {
      propsData,
    });

    expect(
      wrapper.findAll('[data-test="table-header-cell"]').at(0).text()
    ).toBe(propsData.headings[0]);

    expect(
      wrapper.findAll('[data-test="table-header-cell"]').at(1).text()
    ).toBe(propsData.headings[1]);

    expect(
      wrapper.findAll('[data-test="table-header-cell"]').at(2).text()
    ).toBe(propsData.headings[2]);
  });

  it('should populate table body cells correctly', () => {
    const wrapper = shallowMount(Table, {
      propsData,
    });

    expect(wrapper.findAll('[data-test="table-cell"]').at(0).text()).toBe(
      propsData.items[0][0]
    );

    expect(wrapper.findAll('[data-test="table-cell"]').at(1).text()).toBe(
      propsData.items[0][1]
    );

    expect(wrapper.findAll('[data-test="table-cell"]').at(2).text()).toBe(
      propsData.items[0][2]
    );

    expect(wrapper.findAll('[data-test="table-cell"]').at(3).text()).toBe(
      propsData.items[1][0]
    );

    expect(wrapper.findAll('[data-test="table-cell"]').at(4).text()).toBe(
      propsData.items[1][1]
    );

    expect(wrapper.findAll('[data-test="table-cell"]').at(5).text()).toBe(
      propsData.items[1][2]
    );
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
        toHighlight: { key: '0', value: 'Cell 1' },
      },
    });

    expect(
      wrapper.findAll('[data-test="table-row"]').at(0).classes()
    ).toContain('table__row--highlighted');
  });
});
