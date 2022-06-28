import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import ResponsiveTable from '@/components/ResponsiveTable.vue';

const props = {
  headings: ['Heading 1', 'Heading 2', 'Heading 3'],
  items: [
    [1, 2, 3],
    [4, 5, 6],
  ],
};

describe('ResponsiveTable.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(ResponsiveTable, {
      props,
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should add spacing class', () => {
    const wrapper = shallowMount(ResponsiveTable, {
      props: {
        ...props,
        spacing: true,
      },
    });

    expect(wrapper.classes()).toContain('responsive-table--spacing');
  });

  it('does not show table helper after first viewing of component', async () => {
    shallowMount(ResponsiveTable, {
      props,
    }).unmount();

    const wrapper = shallowMount(ResponsiveTable, {
      props,
    });

    expect(wrapper.find('[data-test="responsive-table-helper"]').exists()).toBe(
      false
    );
  });
});
