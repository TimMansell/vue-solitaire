import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';
import DefaultCard from '@/components/DefaultCard.vue';
import BottomCard from '@/components/BottomCard.vue';
import CardPlaceholder from '@/components/CardPlaceholder.vue';

const computed = {
  selectedCardId: () => null,
};

describe('Card.vue', () => {
  it('matches visible snapshot', () => {
    const wrapper = shallowMount(Card, {
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches hidden snapshot', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        visible: false,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches bottom card snapshot', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        bottomCard: true,
      },
      computed,
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      id: 2,
      value: 'K',
      suit: '♦',
      visible: true,
      revealed: true,
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
    expect(wrapper.props().revealed).toBe(true);
    expect(wrapper.props().clickable).toBe(false);
    expect(wrapper.props().bottomCard).toBe(true);
    expect(wrapper.props().stacked).toBe(true);
  });

  it('should render a diamond card', () => {
    const propsData = {
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
      computed,
    });

    expect(wrapper.findComponent(DefaultCard).exists()).toBe(true);
  });

  it('should render a bottom card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        bottomCard: true,
      },
      computed,
    });

    expect(wrapper.findComponent(BottomCard).exists()).toBe(true);
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
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
        stacked: true,
      },
      computed,
    });

    expect(wrapper.classes()).toContain('card--is-stacked');
  });

  it('should render a selected card', () => {
    const wrapper = shallowMount(Card, {
      computed: {
        selectedCardId: () => 0,
      },
    });

    expect(wrapper.classes()).toContain('card--is-selected');
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
          visible: false,
        },
        computed,
      });

      wrapper.trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should call store action "setCard" when clicked when visible', () => {
      const wrapper = shallowMount(Card, {
        mocks,
        computed,
      });

      wrapper.trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
