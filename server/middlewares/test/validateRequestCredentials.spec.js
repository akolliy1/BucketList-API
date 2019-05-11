import {
  validateRegistrationCredentials,
  validateUserModification,
  validateEmailOnRequestChangePassword,
  validateChangePassword,
} from '../validateRequestCredentials';

describe('Validate Request Credentials', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {} };
    res = { status: () => ({ json: data => data }) };
    next = jest.fn();
  });

  describe('SignIn and Signup', () => {
    it(`validates and returns all error messages
    for corresponding field in an array`, () => {
      const validation = validateRegistrationCredentials(req, res, next);
      const { errors, message } = validation;

      expect(message).toBe('Invalid Credentials');
      expect(errors).toEqual({
        email: ['this field is required'],
        password: ['this field is required'],
      });
    });

    it('triggers the next function if validation passes', () => {
      req.body = {
        email: 'e@g.com',
        password: 'secretPIN123',
      };
      validateRegistrationCredentials(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe('Edit user data', () => {
    it(`validates and returns all error messages
    for corresponding field in an array`, () => {
      const validation = validateUserModification(req, res, next);
      const { errors, message } = validation;

      expect(message).toBe('Invalid Credentials');
      expect(errors).toEqual({
        firstName: ['this field is required'],
        lastName: ['this field is required'],
        email: ['this field is required'],
      });
    });

    it('triggers the next function if validation passes', () => {
      req.body = {
        firstName: 'newname',
        lastName: 'lastname',
        email: 'e@g.com',
        password: 'SeCrEt1234',
        contactMobile: 2349099719945,
      };
      validateUserModification(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe('validateEmailOnRequestChangePassword', () => {
    it(`validates and returns all error messages
    for corresponding field in an array`, () => {
      const validation = validateEmailOnRequestChangePassword(req, res, next);
      const { errors, message } = validation;

      expect(message).toBe('Invalid Credentials');
      expect(errors).toEqual({
        email: ['this field is required'],
      });
    });

    it('triggers the next function if validation passes', () => {
      req.body = {
        email: 'e@g.com',
      };
      validateEmailOnRequestChangePassword(req, res, next);
      expect(next).toBeCalled();
    });
  });

  describe('validateChangePassword', () => {
    it(`validates and returns all error messages
    for corresponding field in an array`, () => {
      const validation = validateChangePassword(req, res, next);
      const { errors, message } = validation;

      expect(message).toBe('Invalid Credentials');
      expect(errors).toEqual({
        password: ['this field is required'],
      });
    });

    it('triggers the next function if validation passes', () => {
      req.body = {
        password: 'eeeecom1',
      };
      validateChangePassword(req, res, next);
      expect(next).toBeCalled();
    });
  });
});
