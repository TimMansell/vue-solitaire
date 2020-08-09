import { shallowMount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

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

  it('should have correct props', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        id: 2,
        value: 'K',
        suit: 'd',
        visible: true,
        revealed: true,
        clickable: false,
        bottomCard: true,
        stacked: true,
      },
      computed,
    });

    expect(wrapper.props().id).toBe(2);
    expect(wrapper.props().value).toBe('K');
    expect(wrapper.props().suit).toBe('d');
    expect(wrapper.props().visible).toBe(true);
    expect(wrapper.props().revealed).toBe(true);
    expect(wrapper.props().clickable).toBe(false);
    expect(wrapper.props().bottomCard).toBe(true);
    expect(wrapper.props().stacked).toBe(true);
  });

  it('should render a diamond card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        value: '6',
        suit: 'd',
      },
      computed,
    });

    expect(wrapper.attributes('data-card-suit')).toBe('d');
  });

  it('should render a club card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        value: '6',
        suit: 'c',
      },
      computed,
    });

    expect(wrapper.attributes('data-card-suit')).toBe('c');
  });

  it('should render a heart card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        value: '6',
        suit: 'h',
      },
      computed,
    });

    expect(wrapper.attributes('data-card-suit')).toBe('h');
  });

  it('should render a spade card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        value: '6',
        suit: 's',
      },
      computed,
    });

    expect(wrapper.attributes('data-card-suit')).toBe('s');
  });

  it('should render a default card', () => {
    const wrapper = shallowMount(Card, {
      computed,
    });

    expect(wrapper.find('[data-test="card-default"]').exists()).toBe(true);
  });

  it('should render a bottom card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        bottomCard: true,
      },
      computed,
    });

    expect(wrapper.find('[data-test="card-bottom"]').exists()).toBe(true);
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      propsData: {
        visible: false,
      },
      computed,
    });

    expect(wrapper.find('[data-test="card-hidden"]').exists()).toBe(true);
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

      wrapper.find('[data-test="card-Ac"]').trigger('click');

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

      wrapper.find('[data-test="card"]').trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(0);
    });

    it('should call store action "setCard" when clicked when visible', () => {
      const wrapper = shallowMount(Card, {
        mocks,
        computed,
      });

      wrapper.find('[data-test="card-Ac"]').trigger('click');

      expect(mockStore.dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
