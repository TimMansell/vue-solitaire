import { shallowMount } from '@vue/test-utils';
import Update from '@/pages/Update.vue';

describe('Update.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Update, {
      computed: {
        isLatestVersion: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches no updates snapshot', () => {
    const wrapper = shallowMount(Update, {
      computed: {
        isLatestVersion: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
