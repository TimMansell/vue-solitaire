import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Controls from '@/components/Controls.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Controls.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Controls);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls store action "moveCardToControls" when clicked', () => {
    const actions = {
      restartGame: jest.fn(),
      initGame: jest.fn(),
    };

    const store = new Vuex.Store({
      actions,
    });

    const wrapper = shallowMount(Controls, { store, localVue });

    wrapper.find('[data-test="new-game"]').trigger('click');

    expect(actions.restartGame).toHaveBeenCalled();
    expect(actions.initGame).toHaveBeenCalled();
  });
});
