import { shallowMount } from '@vue/test-utils';
import Controls from '@/components/Controls.vue';
import matchMedia from '../../__tests__/__mocks__/matchMedia.mock';

describe('Controls.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Controls);

    expect(wrapper).toMatchSnapshot();
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
