import { shallowMount } from '@vue/test-utils';
import Update from '@/pages/Update.vue';

describe('Update.vue', () => {
  it('matches updates snapshot', () => {
    const wrapper = shallowMount(Update, {
      computed: {
        isOldVersion: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches no updates snapshot', () => {
    const wrapper = shallowMount(Update, {
      computed: {
        isOldVersion: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
