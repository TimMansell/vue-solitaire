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
        type: 'alt',
      },
    });

    expect(wrapper.classes()).toContain('btn--alt');
  });

  it('renders a link button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'link',
      },
    });

    expect(wrapper.classes()).toContain('btn--link');
  });

  it('renders an icon button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'icon',
      },
    });

    expect(wrapper.classes()).toContain('btn--icon');
  });

  it('renders a stacked button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        isStacked: true,
      },
    });

    expect(wrapper.classes()).toContain('btn--is-stacked');
  });

  it('renders a large button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'lg',
      },
    });

    expect(wrapper.classes()).toContain('btn--large');
  });

  it('should call click method', () => {
    const wrapper = shallowMount(Button);

    wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });
});
