import { shallowMount } from '@vue/test-utils';
import CheckVersion from '@/components/CheckVersion.vue';

jest.mock('@/services/db');

describe('CheckVersion.vue', () => {
  it('matches version match snapshot', () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        versionMatch: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches no version match snapshot', () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        versionMatch: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match version and not show notification', () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        versionMatch: () => true,
      },
    });

    expect(wrapper.find('[data-test="version"]').exists()).toBe(false);
  });

  it('should not match version and show notification', () => {
    const wrapper = shallowMount(CheckVersion, {
      computed: {
        versionMatch: () => false,
      },
    });

    expect(wrapper.find('[data-test="version"]').exists()).toBe(true);
  });
});
