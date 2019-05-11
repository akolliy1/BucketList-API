import jwt from 'jsonwebtoken';
import createToken from '../createToken';

describe('Create jsonwebtoken', () => {
  it('creates a token and encodes the firstName, lastName and id', () => {
    const token = createToken({
      firstName: 'Alwaa', lastName: 'Dadaa', id: '12345678iiiii',
    });
    const decodedToken = jwt.decode(token);

    expect(decodedToken.data).toEqual({
      firstName: 'Alwaa', lastName: 'Dadaa', id: '12345678iiiii',
    });
  });
});
