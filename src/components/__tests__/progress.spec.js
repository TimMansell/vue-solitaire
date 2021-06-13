import { shallowMount } from '@vue/test-utils';
import Progress from '@/components/Progress.vue';

describe('Progress.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Progress);

    expect(wrapper).toMatchSnapshot();
  });
});
