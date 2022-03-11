import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';

const computed = {
  isDisabledGame: () => false,
};

describe('Button.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Button, { computed });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders an alternate button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'alt',
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--alt');
  });

  it('renders a link button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'link',
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--link');
  });

  it('renders an icon button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        type: 'icon',
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--icon');
  });

  it('renders a stacked button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        isStacked: true,
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--is-stacked');
  });

  it('renders a small button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'sm',
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--small');
  });

  it('renders a large button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        size: 'lg',
      },
      computed,
    });

    expect(wrapper.classes()).toContain('btn--large');
  });

  it('renders a disabled button', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        checkDisabled: true,
      },
      computed: {
        isDisabledGame: () => true,
      },
    });

    expect(wrapper.classes()).toContain('btn--disabled');
  });

  it('should call click method', () => {
    const wrapper = shallowMount(Button, { computed });

    wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeTruthy();
  });

  it('should not call click method', () => {
    const wrapper = shallowMount(Button, {
      propsData: {
        checkDisabled: true,
      },
      computed: {
        isDisabledGame: () => true,
      },
    });

    wrapper.trigger('click');

    expect(wrapper.emitted().click).toBeFalsy();
  });
});
