import { createLocalVue, shallowMount } from '@vue/test-utils';
import VModal from 'vue-js-modal';
import Modal from '@/components/Modal.vue';

const localVue = createLocalVue();
localVue.use(VModal);

describe('Modal.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Modal, { localVue });

    expect(wrapper).toMatchSnapshot();
  });
});
