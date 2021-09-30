import { shallowMount } from '@vue/test-utils';
import PageNotFound from '@/pages/PageNotFound.vue';

describe('PageNotFound.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(PageNotFound);

    expect(wrapper).toMatchSnapshot();
  });
});
