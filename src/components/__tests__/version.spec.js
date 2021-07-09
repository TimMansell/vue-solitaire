import { shallowMount } from '@vue/test-utils';
import Version from '@/components/Version.vue';

jest.mock('../../../package.json', () => ({
  version: '1.0.0',
}));

describe('Version.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(Version);

    expect(wrapper).toMatchSnapshot();
  });
});
