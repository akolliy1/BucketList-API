describe('GET All Bucket instance /api/v1/bucketlists/:id', () => {
  let token, id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'anotherusermail@mail.com',
      password: 'some-passwords',
    });

    const bucketList = await bucketListModel.create({
      name: 'a user bucket to fetch',
      created_by: user._id,
    });

    id = bucketList._id;

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'a user bucket to fetch' });
    await userModel.deleteOne({ email: 'anotherusermail@mail.com' });
  });

  test(`Get a single bucket lis and sends a
  fetched data and message as response`, async () => {
    const response = await request(server)
      .get(`/api/v1/bucketlists/${id}`)
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('Bucket List successfully fetched');
  });

  test(`returns error message and status code
    400 if email is not valid`, async () => {
    const response = await request(server)
      .get(`/api/v1/bucketlists/${id}`)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });
});
