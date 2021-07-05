import userPayload from 'Mocks/userPayload.json';

describe('POST signup instance /api/v1/auth/login', () => {
  afterAll(async () => {
    await userModel.deleteOne({ email: 'email@gmail.com' });
  });

  test('register user and sends a token and message as response', async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send(userPayload.signUp)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const { token, message } = response.body;
    expect(message).toBe('User created');
    expect(typeof token).toBe('string');
  });

  test(`returns error message if all required
  fields is empty or undefined`, async () => {
    const payload = {
      email: '',
    };
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    const {
      email, password,
    } = response.body.errors;
    expect(email[0]).toBe('this field is required');
    expect(password[0]).toBe('this field is required');
  });

  test(`returns error message and status code
  400 if email is not valid`, async () => {
    const payload = {
      ...userPayload.signUp,
      email: 'mymail@g',
    };
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    const { email } = response.body.errors;
    expect(email[0]).toBe('your email is not valid');
  });

  test(`returns error message and status code
  400 if password is less than 8 characters`, async () => {
    const payload = {
      ...userPayload.signUp,
      password: 'swwwww1',
    };
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    const { password } = response.body.errors;
    expect(password[0])
      .toBe('this field should be at least eight characters long');
  });
});
