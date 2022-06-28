import { shallowMount } from '@vue/test-utils';
import Button from '@/components/Button.vue';
import { setupStore } from '@@/tests/helpers';

describe('Button.vue', () => {
  describe('Default', () => {
    const global = {
      mocks: {
        $store: setupStore({ isDisabledGame: false }),
      },
    };

    it('renders the component without crashing', () => {
      const wrapper = shallowMount(Button, { global });

      expect(wrapper.isVisible()).toBe(true);
    });

    it('renders an alternate button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          type: 'alt',
        },
      });

      expect(wrapper.classes()).toContain('btn--alt');
    });

    it('renders a link button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          type: 'link',
        },
      });

      expect(wrapper.classes()).toContain('btn--link');
    });

    it('renders an icon button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          type: 'icon',
        },
      });

      expect(wrapper.classes()).toContain('btn--icon');
    });

    it('renders a stacked button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          isStacked: true,
        },
      });

      expect(wrapper.classes()).toContain('btn--is-stacked');
    });

    it('renders a small button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          size: 'sm',
        },
      });

      expect(wrapper.classes()).toContain('btn--small');
    });

    it('renders a large button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          size: 'lg',
        },
      });

      expect(wrapper.classes()).toContain('btn--large');
    });

    it('should call @click function', async () => {
      const spy = vi.fn();
      const wrapper = shallowMount(Button, {
        global,
        props: {
          click: spy,
        },
      });

      await wrapper.trigger('click');

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Disabled', () => {
    const global = {
      mocks: {
        $store: setupStore({ isDisabledGame: true }),
      },
    };

    it('renders a disabled button', () => {
      const wrapper = shallowMount(Button, {
        global,
        props: {
          checkDisabled: true,
        },
      });

      expect(wrapper.classes()).toContain('btn--disabled');
    });

    it('should not call @click function when button is disabled', async () => {
      const spy = vi.fn();
      const wrapper = shallowMount(Button, {
        global,
        props: {
          click: spy,
          checkDisabled: true,
        },
      });

      await wrapper.trigger('click');

      expect(spy).not.toHaveBeenCalled();
    });
  });
});
