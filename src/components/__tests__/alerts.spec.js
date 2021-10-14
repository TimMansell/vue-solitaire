import { shallowMount } from '@vue/test-utils';
import Alerts from '@/components/Alerts.vue';

describe('Alerts.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Alerts);

    expect(wrapper).toMatchSnapshot();
  });
});
