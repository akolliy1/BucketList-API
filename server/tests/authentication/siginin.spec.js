import userPayload from 'Mocks/userPayload.json';

describe('POST signin instance /api/v1/auth/login', () => {
  beforeAll(async () => {
    await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'forexample@email.com',
      password: signinHash,
    });
  });

  afterAll(async () => {
    await userModel.deleteOne({ email: 'forexample@email.com' });
  });

  test('signin §user and sends a token and message as response', async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({
        ...userPayload.signIn,
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('successfuly signin');
  });

  test(`returns an error message with status code
  400 if password is incorrect`, async () => {
    const response = await request(server)
      .post('/api/v1/auth/login')
      .send({
        ...userPayload.signIn,
        password: 'lemmeseeyoupass',
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    const { message } = response.body;
    expect(message).toBe('Incorrect email or password');
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

    const { email, password } = response.body.errors;
    expect(email[0]).toBe('this field is required');
    expect(password[0]).toBe('this field is required');
  });

  test(`returns error message and status code
  400 if email is not valid`, async () => {
    const payload = {
      ...userPayload.signIn,
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
      ...userPayload.signIn,
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
