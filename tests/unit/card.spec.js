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
    selectCard: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Card, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: 'K',
        suit: 'd',
        order: 1,
        visible: true,
        clickable: false,
      },
    });

    expect(wrapper.props().value).toBe('K');
    expect(wrapper.props().suit).toBe('d');
    expect(wrapper.props().order).toBe(1);
    expect(wrapper.props().visible).toBe(true);
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

    expect(wrapper.classes()).toContain('card--is-d');
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

    expect(wrapper.classes()).toContain('card--is-c');
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

    expect(wrapper.classes()).toContain('card--is-h');
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

    expect(wrapper.classes()).toContain('card--is-s');
  });

  it('should render a hidden card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        value: '6',
        suit: 's',
      },
    });

    expect(wrapper.classes('card--is-visible')).toBe(false);
  });

  it('should render a visible card', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        visible: true,
      },
    });

    expect(wrapper.classes()).toContain('card--is-visible');
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

  it('should not call store action "selectCard" when clicked', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        clickable: false,
      },
    });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(wrapper.classes()).toContain('card--is-not-clickable');
    expect(actions.selectCard).not.toHaveBeenCalled();
  });

  it('should not call store action "selectCard" when clicked when not visible', () => {
    const wrapper = shallowMount(Card, { store, localVue });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(actions.selectCard).not.toHaveBeenCalled();
  });

  it('should call store action "selectCard" when clicked when visible', () => {
    const wrapper = shallowMount(Card, {
      store,
      localVue,
      propsData: {
        visible: true,
      },
    });

    wrapper.find('[data-test="card-Ac"]').trigger('click');

    expect(actions.selectCard).toHaveBeenCalled();
  });
});
