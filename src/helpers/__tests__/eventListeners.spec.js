import { addEventListener } from '../eventListeners';

describe('Event Listeners', () => {
  it('should create event listeners', () => {
    const events = {
      mousemove: jest.fn(),
      dragover: jest.fn(),
    };

    const result = JSON.stringify(addEventListener(events));

    expect(result).toEqual(
      JSON.stringify([
        { event: jest.fn(), name: 'mousemove' },
        { event: jest.fn(), name: 'dragover' },
      ])
    );
  });
});
