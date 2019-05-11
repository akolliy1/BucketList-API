describe('GET All Bucket instance /api/v1/bucketlists', () => {
  let token;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'chefmail@mail.com',
      password: 'some-passwords',
    });

    await bucketListModel.create({
      name: 'a bucket to fetch',
      created_by: user._id,
    });

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'a bucket to fetch' });
    await userModel.deleteOne({ email: 'chefmail@mail.com' });
  });

  test('Get all buckets and sends a data and message as response', async () => {
    const response = await request(server)
      .get('/api/v1/bucketlists')
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('BucketList(s) found');
  });

  test(`returns error message and status code
  401 if token is not valid`, async () => {
    const response = await request(server)
      .get('/api/v1/bucketlists')
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });

  test(`returns error message and status code
  401 if no token was found`, async () => {
    const response = await request(server)
      .get('/api/v1/bucketlists')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('no token found');
  });
});
