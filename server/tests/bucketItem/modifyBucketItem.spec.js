/* eslint-disable camelcase */
describe(`PUT - modify single bucket item instanc
 /api/v1/bucketlists/:id`, () => {
  let token, id, item_id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'userTomodify@mail.com',
      password: 'some-passwords',
    });

    const bucketList = await bucketListModel.create({
      name: 'another user bucket to modify',
      created_by: user._id,
    });

    id = bucketList._id;

    const bucketItem = await bucketItemModel.create({
      name: 'another user bucket to modify',
      done: false,
    });

    item_id = bucketItem._id;

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'another user bucket to modify' });
    await bucketItemModel.deleteOne({ name: 'another user bucket to modify' });
    await bucketItemModel.deleteOne({ name: 'third bucket list' });
    await userModel.deleteOne({ email: 'userTomodify@mail.com' });
  });

  test('modify bucket item and sends message as response', async () => {
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}/items/${item_id}`)
      .send({
        name: 'third bucket list'
      })
      .set('authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('Bucket items successfully updated');
  });

  test(`returns error message if all required
    fields is empty or undefined`, async () => {
    const payload = {
      name: '',
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}/items/${item_id}`)
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
    401 if no token provided`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}/items/${item_id}`)
      .send(payload)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('no token found');
  });

  test(`returns error message and status code
    401 if token is invalid`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .put(`/api/v1/bucketlists/${id}/items/${item_id}`)
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });
});
