describe('Delete - delete single bucket instance /api/v1/bucketlists/:id', () => {
  let token, id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'chefmailer@mail.com',
      password: 'some-passwords',
    });

    const bucketCreated = await bucketListModel.create({
      name: 'a another bucket to fetch',
      created_by: user._id
    });

    id = bucketCreated._id;

    console.log('bucketCreated._id', bucketCreated._id);

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'a another bucket to fetch' });
    await userModel.deleteOne({ email: 'chefmailer@mail.com' });
  });

  test('Delete a bucket list and sends a message as response', async () => {
    const response = await request(server)
      .delete(`/api/v1/bucketlists/${id}`)
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('Bucket List successfully deleted');
  });

  test(`returns error message and status code
  401 if no token was provided`, async () => {
    const payload = {
      name: 'first bucket list'
    };
    const response = await request(server)
      .delete(`/api/v1/bucketlists/${id}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message)
      .toBe('no token found');
  });

  test(`returns error message and status code
  401 if no token was invalid`, async () => {
    const payload = {
      name: 'first bucket list'
    };
    const response = await request(server)
      .delete(`/api/v1/bucketlists/${id}`)
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message)
      .toBe('invalid token');
  });
});
