import { shallowMount } from '@vue/test-utils';
import Select from '@/components/Select.vue';

describe('Select.vue', () => {
  it('matches snapshot - number', () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        label: 'Label 1',
        value: 1,
        items: [1, 2, 3],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot - string', () => {
    const wrapper = shallowMount(Select, {
      propsData: {
        label: 'Label 1',
        value: 'value 2',
        items: ['value 1', 'value 2', 'value 3'],
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
