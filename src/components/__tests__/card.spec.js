import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import { setupStore } from '@@/tests/helpers';

const defaultProps = {
  id: 2,
  value: 'K',
  suit: '♦',
};

const defaultGetters = {
  selectedCardId: null,
  isDisabledGame: false,
};

const global = {
  mocks: {
    $store: setupStore(defaultGetters),
  },
};

describe('Card.vue', () => {
  it('renders the component without crashing', () => {
    const wrapper = shallowMount(Card, {
      global,
      props: {
        ...defaultProps,
      },
    });

    expect(wrapper.isVisible()).toBe(true);
  });

  it('should have correct props', () => {
    const props = {
      ...defaultProps,
      visible: true,
      clickable: false,
      bottomCard: true,
      stacked: true,
    };

    const wrapper = shallowMount(Card, {
      global,
      props,
    });

    expect(wrapper.props().id).toBe(2);
    expect(wrapper.props().value).toBe(props.value);
    expect(wrapper.props().suit).toBe(props.suit);
    expect(wrapper.props().visible).toBe(true);
    expect(wrapper.props().clickable).toBe(false);
    expect(wrapper.props().bottomCard).toBe(true);
    expect(wrapper.props().stacked).toBe(true);
  });

  it('should render a diamond card', () => {
    const props = {
      ...defaultProps,
      value: '6',
      suit: '♦',
    };

    const wrapper = shallowMount(Card, {
      global,
      props,
    });

    expect(wrapper.findComponent({ name: 'DefaultCard' }).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${props.value}${props.suit}`
    );
  });

  it('should render a club card', () => {
    const props = {
      ...defaultProps,
      value: '6',
      suit: '♣',
    };

    const wrapper = shallowMount(Card, {
      global,
      props,
    });

    expect(wrapper.findComponent({ name: 'DefaultCard' }).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${props.value}${props.suit}`
    );
  });

  it('should render a heart card', () => {
    const props = {
      ...defaultProps,
      value: '6',
      suit: '♥',
    };

    const wrapper = shallowMount(Card, {
      global,
      props,
    });

    expect(wrapper.findComponent({ name: 'DefaultCard' }).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${props.value}${props.suit}`
    );
  });

  it('should render a spade card', () => {
    const props = {
      ...defaultProps,
      value: '6',
      suit: '♠',
    };

    const wrapper = shallowMount(Card, {
      global,
      props,
    });

    expect(wrapper.findComponent({ name: 'DefaultCard' }).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${props.value}${props.suit}`
    );
  });

  it('should render a default card', () => {
    const wrapper = shallowMount(Card, {
      global,
      props: {
        ...defaultProps,
      },
    });

    expect(wrapper.findComponent({ name: 'DefaultCard' }).exists()).toBe(true);
  });

  it('should render a bottom card', () => {
    const wrapper = shallowMount(Card, {
      global,
      props: {
        ...defaultProps,
        bottomCard: true,
      },
    });

    expect(wrapper.findComponent({ name: 'BottomCard' }).exists()).toBe(true);
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      global,
      props: {
        ...defaultProps,
        visible: false,
      },
    });

    expect(wrapper.attributes('data-test')).toBe('card-hidden');
    expect(wrapper.findComponent({ name: 'CardPlaceholder' }).exists()).toBe(
      true
    );
  });

  it('should render a stacked card', () => {
    const wrapper = shallowMount(Card, {
      global,
      props: {
        ...defaultProps,
        stacked: true,
      },
    });

    expect(wrapper.classes()).toContain('card--is-stacked');
  });

  it('should render a selected card', () => {
    const wrapper = shallowMount(Card, {
      global: {
        mocks: {
          $store: setupStore({ ...defaultGetters, selectedCardId: 2 }),
        },
      },
      props: {
        ...defaultProps,
      },
    });

    expect(wrapper.classes()).toContain('card--is-selected');
    expect(wrapper.classes()).not.toContain('card--is-dragged');
  });

  it('should render a dragged card', () => {
    const wrapper = shallowMount(Card, {
      global: {
        mocks: {
          $store: setupStore({ ...defaultGetters, selectedCardId: 2 }),
        },
      },
      props: {
        ...defaultProps,
        isDragged: true,
      },
    });

    expect(wrapper.classes()).toContain('card--is-dragged');
    expect(wrapper.classes()).not.toContain('card--is-selected');
  });

  describe('Set Card', () => {
    it('should not call store action when clicked', () => {
      const spy = jest.fn();
      const wrapper = shallowMount(Card, {
        global: {
          mocks: {
            $store: setupStore({ dispatch: spy, ...defaultGetters }),
          },
        },
        props: {
          ...defaultProps,
          clickable: false,
        },
      });

      wrapper.trigger('click');

      expect(wrapper.classes()).toContain('card--is-not-clickable');
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not call store action when clicked when not visible', () => {
      const spy = jest.fn();
      const wrapper = shallowMount(Card, {
        global: {
          mocks: {
            $store: setupStore({ dispatch: spy, ...defaultGetters }),
          },
        },
        props: {
          ...defaultProps,
          visible: false,
        },
      });

      wrapper.trigger('click');

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should not call store action when clicked when game is disabled', () => {
      const spy = jest.fn();
      const wrapper = shallowMount(Card, {
        global: {
          mocks: {
            $store: setupStore({
              dispatch: spy,
              ...defaultGetters,
              isDisabledGame: true,
            }),
          },
        },
        props: {
          ...defaultProps,
          visible: false,
        },
      });

      wrapper.trigger('click');

      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('should call store action when clicked when visible', () => {
      const spy = jest.fn();
      const wrapper = shallowMount(Card, {
        global: {
          mocks: {
            $store: setupStore({ dispatch: spy, ...defaultGetters }),
          },
        },
        props: {
          ...defaultProps,
        },
      });

      wrapper.trigger('click');

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
