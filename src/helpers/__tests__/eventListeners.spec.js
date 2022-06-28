import { addEventListener } from '../eventListeners';

describe('Event Listeners', () => {
  it('should create event listeners', () => {
    const events = {
      mousemove: vi.fn(),
      dragover: vi.fn(),
    };

    const result = JSON.stringify(addEventListener(events));

    expect(result).toEqual(
      JSON.stringify([
        { event: vi.fn(), name: 'mousemove' },
        { event: vi.fn(), name: 'dragover' },
      ])
    );
  });
});
