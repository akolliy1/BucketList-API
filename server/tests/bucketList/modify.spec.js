describe('PUT - modify single bucket instance /api/v1/bucketlists/:id', () => {
  let token, id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'anotheruser@mail.com',
      password: 'some-passwords',
    });

    const bucketList = await bucketListModel.create({
      name: 'a another user bucket to fetch',
      created_by: user._id,
    });

    await bucketListModel.create({
      name: 'first bucket list',
      created_by: user._id,
    });

    id = bucketList._id;

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'third bucket list' });
    await bucketListModel.deleteOne({ name: 'first bucket list' });
    await userModel.deleteOne({ email: 'anotheruser@mail.com' });
  });

  test(`Modify a bucket list and sends a edit 
  bucket list and message as response`, async () => {
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}`)
      .send({
        name: 'third bucket list'
      })
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('Bucket Lists successfully updated');
  });

  test(`returns error message if all required
  fields is empty or undefined`, async () => {
    const payload = {
      name: '',
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}`)
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
      .put(`/api/v1/bucketlists/${id}`)
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });

  test(`returns error message and status code
  401 if token was not found`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('no token found');
  });

  test(`returns error message and status code
  400 if bucket list has previously been created`, async () => {
    const payload = {
      name: 'first bucket list'
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}`)
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
