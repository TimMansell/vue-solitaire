import { formatResponse, formatError } from '../helpers';

describe('DB service', () => {
  it('formatResponse', () => {
    const responseObject = {
      value: 5,
    };

    const result = formatResponse(responseObject);

    expect(result).toEqual({
      error: false,
      response: responseObject,
    });
  });

  it('formatError', () => {
    const result = formatError();

    expect(result).toEqual({
      error: true,
    });
  });
});
