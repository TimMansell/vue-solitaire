import { shallowMount } from '@vue/test-utils';
import UpdatedAlert from '@/components/UpdatedAlert.vue';

describe('UpdatedAlert.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(UpdatedAlert, {
      computed: {
        hasGameUpdated: () => false,
      },
    });

    expect(wrapper).toMatchSnapshot();
  });
});
