import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Select from '@/components/Select.vue';

describe('Select.vue', () => {
  it('renders the component without crashing - number', () => {
    const wrapper = shallowMount(Select, {
      props: {
        label: 'Label 1',
        value: 1,
        items: [1, 2, 3],
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('renders the component without crashing - string', () => {
    const wrapper = shallowMount(Select, {
      props: {
        label: 'Label 1',
        value: 'value 2',
        items: ['value 1', 'value 2', 'value 3'],
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('renders formats id from label correctly', () => {
    const wrapper = shallowMount(Select, {
      props: {
        label: 'Label 1',
      },
    });

    expect(wrapper.find('[data-test="select"]').attributes('id')).toBe(
      'Label-1'
    );
  });
});
