import User from '../controllers/User';


import checkUserIsAuthenticated from '../middlewares/checkUserIsAuthenticated';

import {
  validateRegistrationCredentials,
} from '../middlewares/validateRequestCredentials';

const {
  signInOrUp,
  signOut,
} = User;

export default (app) => {
  app.post('/api/v1/auth/login', validateRegistrationCredentials, signInOrUp);
  app.post('/api/v1/auth/logout', checkUserIsAuthenticated, signOut);
};
