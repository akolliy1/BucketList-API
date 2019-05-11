import BucketLists from '../controllers/BucketLists';


import checkUserIsAuthenticated from '../middlewares/checkUserIsAuthenticated';

import {
  validateBucketListCreation,
} from '../middlewares/validateRequestCredentials';

const {
  createBucketList,
  modify,
  getBucketList,
  getAllBucketList,
  deleteBucketList,
} = BucketLists;

export default (app) => {
  app.route('/api/v1/bucketlists/')
    .post(checkUserIsAuthenticated, validateBucketListCreation, createBucketList)
    .get(checkUserIsAuthenticated, getAllBucketList);
  app.route('/api/v1/bucketlists/:id')
    .put(checkUserIsAuthenticated, validateBucketListCreation, modify)
    .get(checkUserIsAuthenticated, getBucketList)
    .delete(checkUserIsAuthenticated, deleteBucketList);
};
