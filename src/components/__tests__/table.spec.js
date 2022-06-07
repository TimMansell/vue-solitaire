import { shallowMount } from '@vue/test-utils';
import Table, { isRowHighlighted } from '@/components/Table.vue';

const props = {
  headings: ['Heading 1', 'Heading 2', 'Heading 3'],
  items: [
    ['Cell 1', 'Cell 2', 'Cell 3'],
    ['Cell 4', 'Cell 5', 'Cell 6'],
  ],
};

describe('Table.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Table, {
      props,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('renders the component without crashing - placeholder rows', () => {
    const wrapper = shallowMount(Table, {
      props: {
        ...props,
        items: [],
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should add spacing class', () => {
    const wrapper = shallowMount(Table, {
      props: {
        ...props,
        spacing: true,
      },
    });

    expect(wrapper.classes()).toContain('table--spacing');
  });

  it('should populate table headers correctly', () => {
    const wrapper = shallowMount(Table, {
      props,
    });

    expect(wrapper.findAll('[data-test="table-header-cell"]')[0].text()).toBe(
      props.headings[0]
    );

    expect(wrapper.findAll('[data-test="table-header-cell"]')[1].text()).toBe(
      props.headings[1]
    );

    expect(wrapper.findAll('[data-test="table-header-cell"]')[2].text()).toBe(
      props.headings[2]
    );
  });

  it('should populate table body cells correctly', () => {
    const wrapper = shallowMount(Table, {
      props,
    });

    expect(wrapper.findAll('[data-test="table-cell"]')[0].text()).toBe(
      props.items[0][0]
    );

    expect(wrapper.findAll('[data-test="table-cell"]')[1].text()).toBe(
      props.items[0][1]
    );

    expect(wrapper.findAll('[data-test="table-cell"]')[2].text()).toBe(
      props.items[0][2]
    );

    expect(wrapper.findAll('[data-test="table-cell"]')[3].text()).toBe(
      props.items[1][0]
    );

    expect(wrapper.findAll('[data-test="table-cell"]')[4].text()).toBe(
      props.items[1][1]
    );

    expect(wrapper.findAll('[data-test="table-cell"]')[5].text()).toBe(
      props.items[1][2]
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
      props: {
        ...props,
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
      props,
    });

    expect(wrapper.find('[data-test="table-placeholder-row"]').exists()).toBe(
      false
    );

    expect(wrapper.find('[data-test="table-row"]').exists()).toBe(true);
  });

  it('should show highlight correct row', () => {
    const wrapper = shallowMount(Table, {
      props: {
        ...props,
        toHighlight: { key: '0', value: 'Cell 1' },
      },
    });

    expect(wrapper.findAll('[data-test="table-row"]')[0].classes()).toContain(
      'table__row--highlighted'
    );
  });
});
