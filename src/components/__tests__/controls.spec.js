import { shallowMount } from '@vue/test-utils';
import Controls from '@/components/Controls.vue';

describe('Controls.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Controls);

    expect(wrapper).toMatchSnapshot();
  });
});
