import { shallowMount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

jest.mock('../../../package.json', () => ({
  version: '1.0.0',
}));

describe('Footer.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Footer);

    expect(wrapper).toMatchSnapshot();
  });
});
