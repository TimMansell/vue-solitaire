import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';
import matchMedia from './__mocks__/matchMedia.mock';

describe('Pagination.vue', () => {
  it('matches snapshot - 1 page', () => {
    const wrapper = shallowMount(Pagination);

    expect(wrapper).toMatchSnapshot();
  });

  it('matches snapshot - multiple pages', () => {
    const wrapper = shallowMount(Pagination, {
      propsData: {
        pages: 100,
        startOn: 10,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('returns correct default range', async () => {
    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(1);
  });

  it('returns correct range for xs', async () => {
    matchMedia.useMediaQuery('(min-width: 360px)');

    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(3);
  });

  it('returns correct range for sm', async () => {
    matchMedia.useMediaQuery('(min-width: 480px)');

    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(7);
  });

  it('returns correct range for xl', async () => {
    matchMedia.useMediaQuery('(min-width: 1366px)');

    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(9);
  });
});
