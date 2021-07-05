describe('GET / indexRoute', () => {
  it('sends welcome message in json', async () => {
    const response = await request(server)
      .get('/api/v1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    expect(response.body.message)
      .toEqual('Welcome to the BucketList-API');
  });
});
