import matchMedia from '@@/tests/unit/mocks/matchMedia.mock';
import { shallowMount } from '@vue/test-utils';
import Controls from '@/components/Controls.vue';

describe('Controls.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Controls);

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should not show github button', () => {
    const wrapper = shallowMount(Controls);

    expect(wrapper.vm.showGithubButton).toBe(false);
  });

  it('should show github button', () => {
    matchMedia.useMediaQuery('(min-width: 360px)');

    const wrapper = shallowMount(Controls);

    expect(wrapper.vm.showGithubButton).toBe(true);
  });
});
