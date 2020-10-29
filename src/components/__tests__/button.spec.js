import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

describe('Button.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Button);

    expect(wrapper).toMatchSnapshot();
  });

  it('renders an alternate button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        alt: true,
      },
    });

    expect(wrapper.classes()).toContain('btn--alt');
  });

  it('renders a link button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        link: true,
      },
    });

    expect(wrapper.classes()).toContain('btn--link');
  });

  it('should call click method', () => {
    const wrapper = shallowMount(Button);

    wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
