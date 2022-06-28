import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import Pagination from '@/components/Pagination.vue';
import matchMedia from '../../__tests__/__mocks__/matchMedia.mock';

describe('Pagination.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Pagination);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('renders the component without crashing - multiple pages', () => {
    const wrapper = shallowMount(Pagination, {
      props: {
        pages: 100,
        startOn: 10,
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('returns correct default range', async () => {
    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(3);
  });

  it('returns correct range for xs', async () => {
    matchMedia.useMediaQuery('(min-width: 360px)');

    const wrapper = shallowMount(Pagination);

    expect(wrapper.vm.range).toBe(5);
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
