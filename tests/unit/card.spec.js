import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Card from '@/components/Card.vue';
import state from '@/store/state';
import getters from '@/store/getters';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Card.vue', () => {
  let store;

  const actions = {
    setCard: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  it('matches visible snapshot', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        visible: true,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches hidden snapshot', () => {
    const wrapper = shallowMount(Card, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        id: 2,
        value: 'K',
        suit: 'd',
        order: 1,
        position: [5, 6],
        visible: true,
        revealed: true,
        clickable: false,
      },
    });

    expect(wrapper.props().id).toBe(2);
    expect(wrapper.props().value).toBe('K');
    expect(wrapper.props().suit).toBe('d');
    expect(wrapper.props().order).toBe(1);
    expect(wrapper.props().position).toStrictEqual([5, 6]);
    expect(wrapper.props().visible).toBe(true);
    expect(wrapper.props().revealed).toBe(true);
    expect(wrapper.props().clickable).toBe(false);
  });

  it('should render a diamond card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: '6',
        suit: 'd',
      },
    });

    expect(wrapper.attributes('data-card-suit')).toBe('d');
  });

  it('should render a club card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: '6',
        suit: 'c',
      },
    });

    expect(wrapper.attributes('data-card-suit')).toBe('c');
  });

  it('should render a heart card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: '6',
        suit: 'h',
      },
    });

    expect(wrapper.attributes('data-card-suit')).toBe('h');
  });

  it('should render a spade card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: '6',
        suit: 's',
      },
    });

    expect(wrapper.attributes('data-card-suit')).toBe('s');
  });

  it('should render a visible card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
    });

    expect(wrapper.find('[data-test="card-visible"]').exists()).toBe(true);
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        visible: false,
      },
    });

    expect(wrapper.find('[data-test="card-hidden"]').exists()).toBe(true);
  });

  it('should render a selected card', () => {
    const newGetters = {
      selectedCardId: () => 0,
    };

    const storeSelected = new Vuex.Store({
      state,
      getters: newGetters,
      actions,
    });

    const wrapper = shallowMount(Card, {
      store: storeSelected,
      localVue,
      propsData: {
        value: 'K',
        suit: 'c',
      },
    });

    expect(wrapper.classes()).toContain('card--is-selected');
  });

  it('should not call store action "setCard" when clicked', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        clickable: false,
      },
    });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(wrapper.classes()).toContain('card--is-not-clickable');
    expect(actions.setCard).not.toHaveBeenCalled();
  });

  it('should not call store action "setCard" when clicked when not visible', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        clickable: false,
      },
    });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(actions.setCard).not.toHaveBeenCalled();
  });

  it('should call store action "setCard" when clicked when visible', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
    });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(actions.setCard).toHaveBeenCalled();
  });
});
