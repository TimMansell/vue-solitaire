import { shallowMount } from '@vue/test-utils';
import SkeletonLoader from '@/components/SkeletonLoader.vue';

describe('SkeletonLoader.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(SkeletonLoader);

    expect(wrapper).toMatchSnapshot();
  });
});
