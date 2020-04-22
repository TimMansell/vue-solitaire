import { shallowMount } from '@vue/test-utils';
import NewGame from '@/components/NewGame.vue';

describe('NewGame.vue', () => {
  it('matches snapshot', () => {
    const wrapper = shallowMount(NewGame);

    expect(wrapper).toMatchSnapshot();
  });

  it('calls restartGame when clicked', () => {
    const wrapper = shallowMount(NewGame);
    const mockFunction = jest.fn();

    wrapper.setMethods({ restartGame: mockFunction });

    wrapper.find('[data-test="new-game"]').trigger('click');

    expect(mockFunction).toHaveBeenCalled();
  });
});
