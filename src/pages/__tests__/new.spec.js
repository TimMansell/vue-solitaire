import { shallowMount } from '@vue/test-utils';
import New from '@/pages/New.vue';

describe('New.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(New, {
      computed: {
        isOnline: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
