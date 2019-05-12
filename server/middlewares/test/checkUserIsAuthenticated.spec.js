import token from '__Mocks__/token';
import checkUserIsAuthenticated from '../checkUserIsAuthenticated';

describe('Authentication check', () => {
  let req, res, next;
  beforeEach(() => {
    req = { headers: {}, query: {} };
    res = { status: () => ({ json: data => data }) };
    next = jest.fn();
  });

  it('returns an error message if token is not provided', () => {
    expect(checkUserIsAuthenticated(req, res, next))
      .toEqual({ message: 'no token found' });
  });

  it('returns an error message if token is invalid', () => {
    req.headers = { authorization: 'some-invalid-token' };

    expect(checkUserIsAuthenticated(req, res, next))
      .toEqual({ message: 'invalid token' });
  });

  it('triggers the next function if token is valid', () => {
    req = { headers: {}, query: { authorization: token } };
    checkUserIsAuthenticated(req, res, next);

    expect(next).toBeCalled();
  });
});
