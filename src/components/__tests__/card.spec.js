import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import DefaultCard from '@/components/DefaultCard.vue';
import BottomCard from '@/components/BottomCard.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

const defaultProps = {
  id: 2,
  value: 'K',
  suit: '♦',
};

const computed = {
  selectedCardId: () => null,
};

describe('Card.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches hidden snapshot', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        visible: false,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches bottom card snapshot', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        bottomCard: true,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      ...defaultProps,
      visible: true,
      clickable: false,
      bottomCard: true,
      stacked: true,
    };

    const wrapper = shallowMount(Card, {
      propsData,
      computed,
    });

    expect(wrapper.props().id).toBe(2);
    expect(wrapper.props().value).toBe(propsData.value);
    expect(wrapper.props().suit).toBe(propsData.suit);
    expect(wrapper.props().visible).toBe(true);
    expect(wrapper.props().clickable).toBe(false);
    expect(wrapper.props().bottomCard).toBe(true);
    expect(wrapper.props().stacked).toBe(true);
  });

  it('should render a diamond card', () => {
    const propsData = {
      ...defaultProps,
      value: '6',
      suit: '♦',
    };

    const wrapper = shallowMount(Card, {
      propsData,
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${propsData.value}${propsData.suit}`
    );
  });

  it('should render a club card', () => {
    const propsData = {
      ...defaultProps,
      value: '6',
      suit: '♣',
    };

    const wrapper = shallowMount(Card, {
      propsData,
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${propsData.value}${propsData.suit}`
    );
  });

  it('should render a heart card', () => {
    const propsData = {
      ...defaultProps,
      value: '6',
      suit: '♥',
    };

    const wrapper = shallowMount(Card, {
      propsData,
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${propsData.value}${propsData.suit}`
    );
  });

  it('should render a spade card', () => {
    const propsData = {
      ...defaultProps,
      value: '6',
      suit: '♠',
    };

    const wrapper = shallowMount(Card, {
      propsData,
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
    expect(wrapper.attributes('data-test')).toBe(
      `card-${propsData.value}${propsData.suit}`
    );
  });

  it('should render a default card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
      },
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
  });

  it('should render a bottom card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        bottomCard: true,
      },
      computed,
    });

    expect(wrapper.findComponent(BottomCard).exists()).toBe(true);
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        visible: false,
      },
      computed,
    });

    expect(wrapper.attributes('data-test')).toBe('card-hidden');
    expect(wrapper.findComponent(CardPlaceholder).exists()).toBe(true);
  });

  it('should render a stacked card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        stacked: true,
      },
      computed,
    });

    expect(wrapper.classes()).toContain('card--is-stacked');
  });

  it('should render a selected card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
      },
      computed: {
        selectedCardId: () => 2,
      },
    });

    expect(wrapper.classes()).toContain('card--is-selected');
    expect(wrapper.classes()).not.toContain('card--is-dragged');
  });

  it('should render a dragged card', async () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        ...defaultProps,
        isDragged: true,
      },
      computed: {
        selectedCardId: () => 2,
      },
    });

    expect(wrapper.classes()).toContain('card--is-dragged');
    expect(wrapper.classes()).not.toContain('card--is-selected');
  });

  describe('Set Card', () => {
    const mockStore = { dispatch: jest.fn() };

    const mocks = {
      $store: mockStore,
    };

    it('should not call store action "setCard" when clicked', () => {
      const wrapper = shallowMount(Card, {
        mocks,
        propsData: {
          ...defaultProps,
          clickable: false,
        },
        computed,
      });

      wrapper.trigger('click');

      expect(wrapper.classes()).toContain('card--is-not-clickable');
      expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should not call store action "setCard" when clicked when not visible', () => {
      const wrapper = shallowMount(Card, {
        mocks,
        propsData: {
          ...defaultProps,
          visible: false,
        },
        computed,
      });

      wrapper.trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should call store action "setCard" when clicked when visible', () => {
      const wrapper = shallowMount(Card, {
        propsData: {
          ...defaultProps,
        },
        mocks,
        computed,
      });

      wrapper.trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
