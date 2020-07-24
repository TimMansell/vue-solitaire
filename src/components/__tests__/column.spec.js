import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Column from '@/components/Column.vue';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Column.vue', () => {
  let store;

  const getters = {
    selectedCardId: () => 1,
  };

  const actions = {
    moveCardsToColumn: jest.fn(),
  };

  beforeEach(() => {
    store = new Vuex.Store({
      state,
      getters,
      actions,
    });
  });

  it('matches snapshot', () => {
    const wrapper = shallowMount(Column, { store, localVue });

    expect(wrapper).toMatchSnapshot();
  });

  it('should have correct props', () => {
    const propsData = {
      cards: [
        {
          value: 'K',
          suit: 'd',
          order: 1,
          visible: true,
          clickable: false,
        },
      ],
      columnNo: 1,
    };

    const wrapper = shallowMount(Column, {
      store,
      localVue,
      propsData,
    });

    expect(wrapper.props().cards).toBe(propsData.cards);
    expect(wrapper.props().columnNo).toBe(1);
  });

  it('should call store action "moveCardsToColumn" when clicked', () => {
    const wrapper = shallowMount(Column, { store, localVue });

    wrapper.find('[data-test="column-0"]').trigger('click');

    expect(actions.moveCardsToColumn).toHaveBeenCalled();
  });
});
