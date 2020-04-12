import { shallowMount } from '@vue/test-utils';
import Column from '@/components/Column.vue';

describe('Column.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Column);

    expect(wrapper).toMatchSnapshot();
  });
});
