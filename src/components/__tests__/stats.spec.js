import { shallowMount } from '@vue/test-utils';
import Stats from '@/components/Stats.vue';

describe('Stats.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Stats, {
      computed: {
        timer: () => 1,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
