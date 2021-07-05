import errorHandler from '../errorHandler';

describe('user Error Handler', () => {
  it(`returns appropriate error message and status
  code if error code is 11000`, () => {
    const errorData = errorHandler({ code: 11000 }, 'user');
    const { message, statusCode } = errorData;

    expect(message).toEqual('It seems you\'ve registered, please login or signup with another email.');
    expect(statusCode).toEqual(409);
  });

  it(`returns a generic error message and status code
  500 if error code is not handled`, () => {
    const errorData = errorHandler({ code: 1100000000000 });
    const { message, statusCode } = errorData;

    expect(message).toEqual('An error occurred');
    expect(statusCode).toEqual(500);
  });
});
