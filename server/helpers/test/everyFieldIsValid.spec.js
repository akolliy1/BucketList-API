import everyFieldIsValid from '../everyFieldIsValid';

describe('every field is valid helper function', () => {
  it('returns false if each field in the parsed array is not valid', async () => {
    const isValid = await everyFieldIsValid('email', ['invalid', 'invalid'], userModel);
    expect(isValid).toBe(false);
  });
});
