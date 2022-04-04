import { shallowMount } from '@vue/test-utils';
import Update from '@/pages/Update.vue';

describe('Update.vue', () => {
  it('matches updates snapshot', () => {
    const wrapper = shallowMount(Update);

    expect(wrapper).toMatchSnapshot();
  });
});
