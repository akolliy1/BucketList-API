import BucketItems from '../controllers/BucketItems';


import checkUserIsAuthenticated from '../middlewares/checkUserIsAuthenticated';

import {
  validateBucketItemsCreation,
} from '../middlewares/validateRequestCredentials';

const {
  createBucketItem,
  modify,
  deleteBucketItem,
} = BucketItems;

export default (app) => {
  app.post('/api/v1/bucketlists/:id/items/',
    checkUserIsAuthenticated,
    validateBucketItemsCreation,
    createBucketItem);
  app.route('/api/v1/bucketlists/:id/items/:item_id')
    .put(checkUserIsAuthenticated, validateBucketItemsCreation, modify)
    .delete(checkUserIsAuthenticated, deleteBucketItem);
};
