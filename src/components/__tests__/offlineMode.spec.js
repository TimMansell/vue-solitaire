import { shallowMount } from '@vue/test-utils';
import OfflineMode from '@/components/OfflineMode.vue';

describe('OfflineMode.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(OfflineMode);

    expect(wrapper).toMatchSnapshot();
  });
});
