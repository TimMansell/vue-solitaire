import { shallowMount } from '@vue/test-utils';
import VersionAlert from '@/components/VersionAlert.vue';

describe('VersionAlert.vue', () => {
  it('matches version match snapshot', () => {
    const wrapper = shallowMount(VersionAlert, {
      computed: {
        versionMatch: () => true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches no version match snapshot', () => {
    const wrapper = shallowMount(VersionAlert, {
      computed: {
        versionMatch: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should match version and not show notification', () => {
    const wrapper = shallowMount(VersionAlert, {
      computed: {
        versionMatch: () => true,
      },
    });

    expect(wrapper.find('[data-test="version-alert"]').exists()).toBe(false);
  });

  it('should not match version and show notification', () => {
    const wrapper = shallowMount(VersionAlert, {
      computed: {
        versionMatch: () => false,
      },
    });

    expect(wrapper.find('[data-test="version-alert"]').exists()).toBe(true);
  });
});
