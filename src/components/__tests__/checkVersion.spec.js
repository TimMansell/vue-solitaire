import { shallowMount } from '@vue/test-utils';
import CheckVersion from '@/components/CheckVersion.vue';

jest.mock('@/services/db');

describe('CheckVersion.vue', () => {
  it('matches version match snapshot', async () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        version: () => 'x.x.x',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper).toMatchSnapshot();
  });

  it('matches no version match snapshot', async () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        version: () => 'a.b.c',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper).toMatchSnapshot();
  });

  it('should match version and not show notification', async () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        version: () => 'x.x.x',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="version"]').exists()).toBe(false);
  });

  it('should not match version and show notification', async () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        version: () => 'a.b.c',
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('[data-test="version"]').exists()).toBe(true);
  });
});
