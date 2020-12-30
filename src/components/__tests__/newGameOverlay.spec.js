import { shallowMount } from '@vue/test-utils';
import NewGameOverlay from '@/components/NewGameOverlay.vue';

describe('NewGameOverlay.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(NewGameOverlay);

    expect(wrapper).toMatchSnapshot();
  });
});
