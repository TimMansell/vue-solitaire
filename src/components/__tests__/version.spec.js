import { shallowMount } from '@vue/test-utils';
import Version from '@/components/Version.vue';

describe('Version.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Version, {
      computed: {
        version: () => '1.0.0',
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
