describe('POST signup instance /api/v1/bucketlists', () => {
  let token, id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'createanotheruser@mail.com',
      password: 'some-passwords',
    });

    const bucketList = await bucketListModel.create({
      name: 'another user bucket list',
      created_by: user._id,
    });

    id = bucketList._id;

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketItemModel.deleteOne({ name: 'fifth bucket list' });
    await bucketListModel.deleteOne({ name: 'another user bucket list' });
    await userModel.deleteOne({ email: 'createanotheruser@mail.com' });
  });

  test(`Create a bucket item and sends a item
  created and message as response`, async () => {
    const response = await request(server)
      .post(`/api/v1/bucketlists/${id}/items`)
      .send({
        name: 'fifth bucket list'
      })
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201);

    const { message } = response.body;
    expect(message).toBe('Bucket item created successfuly');
  });

  test(`returns error message if all required
    fields is empty or undefined`, async () => {
    const payload = {
      name: '',
    };
    const response = await request(server)
      .post(`/api/v1/bucketlists/${id}/items`)
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
    401 if token is not valid`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .post(`/api/v1/bucketlists/${id}/items`)
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });

  test(`returns error message and status code
    401 if no token found`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .post(`/api/v1/bucketlists/${id}/items`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('no token found');
  });

  test(`returns error message and status code
    409 if password is less than 8 characters`, async () => {
    const payload = {
      name: 'fifth bucket list'
    };
    const response = await request(server)
      .post(`/api/v1/bucketlists/${id}/items`)
      .send(payload)
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409);

    const { message } = response.body;
    expect(message)
      .toBe('You already have this bucket item');
  });
});
