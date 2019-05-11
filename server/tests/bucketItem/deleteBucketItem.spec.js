/* eslint-disable camelcase */
describe(`Delete - Delete single bucket item instance
 /api/v1/bucketlists/:id/items/:item_id`, () => {
  let token, id, item_id;
  beforeAll(async () => {
    const user = await userModel.create({
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'userToEdit@mail.com',
      password: 'some-passwords',
    });

    const bucketList = await bucketListModel.create({
      name: 'another user bucket to edit',
      created_by: user._id,
    });

    id = bucketList._id;

    const bucketItem = await bucketItemModel.create({
      name: 'another user bucket to edit',
      done: false,
    });

    item_id = bucketItem._id;

    token = generateToken(user);
  });
  afterAll(async () => {
    await bucketListModel.deleteOne({ name: 'another user bucket to edit' });
    await bucketItemModel.deleteOne({ name: 'another user bucket to edit' });
    await userModel.deleteOne({ email: 'userToEdit@mail.com' });
  });

  test('Delete a bucket item and sends message as response', async () => {
    const response = await request(server)
      .delete(`/api/v1/bucketlists/${id}/items/${item_id}`)
      .set('Accept', 'application/json')
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200);

    const { message } = response.body;
    expect(message).toBe('Bucket item successfully deleted');
  });

  test(`returns error message and status code
    401 if no token provided`, async () => {
    const payload = {
      name: 'my second bucket list',
    };
    const response = await request(server)
      .delete(`/api/v1/bucketlists/${id}/items/${item_id}`)
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
      .delete(`/api/v1/bucketlists/${id}/items/${item_id}`)
      .send(payload)
      .set('authorization', 'token')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401);

    const { message } = response.body;
    expect(message).toBe('invalid token');
  });
});
