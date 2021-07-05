describe('POST signup instance /api/v1/bucketlists', () => {
  let token;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'chefmail@mail.com',
      password: 'some-passwords',
    });

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'first bucket list' });
    await userModel.deleteOne({ email: 'chefmail@mail.com' });
  });

  test(`Create a bucket list and sends a bucket
  list created and message as response`, async () => {
    const response = await request(server)
      .post('/api/v1/bucketlists')
      .send({
        name: 'first bucket list'
      })
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const { message } = response.body;
    expect(message).toBe('Great BucketLists');
  });

  test(`returns error message if all required
  fields is empty or undefined`, async () => {
    const payload = {
      name: '',
    };
    const response = await request(server)
      .post('/api/v1/bucketlists')
      .send(payload)
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400);

    const {
      name,
    } = response.body.errors;
    expect(name[0]).toBe('this field is required');
  });

  test(`returns error message and status code
  401 if no token was proovided`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .post('/api/v1/bucketlists')
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('no token found');
  });

  test(`returns error message and status code
  401 if no token was proovided`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .post('/api/v1/bucketlists')
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });

  test(`returns error message and status code
  409 if name already exist in database`, async () => {
    const payload = {
      name: 'first bucket list'
    };
    const response = await request(server)
      .post('/api/v1/bucketlists')
      .send(payload)
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);

    const { message } = response.body;
    expect(message)
      .toBe('You have created this bucket list previously');
  });
});
