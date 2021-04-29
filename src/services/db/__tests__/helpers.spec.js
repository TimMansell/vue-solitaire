import { formatResponse, formatError } from '../helpers';

describe('DB service', () => {
  it('formatResponse', () => {
    const value = {
      value: 5,
    };

    const responseObject = {
      data: {
        value,
      },
    };

    const result = formatResponse(responseObject);

    expect(result).toEqual({
      error: false,
      response: { value },
    });
  });

  it('formatError', () => {
    const result = formatError();

    expect(result).toEqual({
      error: true,
    });
  });
});
