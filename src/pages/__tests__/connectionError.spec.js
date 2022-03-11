import { shallowMount } from '@vue/test-utils';
import ConnectionError from '@/pages/ConnectionError.vue';

describe('ConnectionError.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(ConnectionError);

    expect(wrapper).toMatchSnapshot();
  });
});
