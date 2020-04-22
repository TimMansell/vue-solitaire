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
});
