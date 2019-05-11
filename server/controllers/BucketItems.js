/* eslint-disable camelcase */
import errorHandler from '../helpers/errorHandler';
import BucketList from '../models/BucketList';
import BucketItem from '../models/BucketItem';

/**
 *
 * @class bucketItem
 * @returns {object} static methods
 */
class BucketItems {
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response data
 * @memberof BucketItem class
 */
  static async createBucketItem(req, res) {
    try {
      const { id } = req.params;
      const data = await BucketItem.create({
        ...req.body, bucketItemId: id,
      });
      if (data) {
        BucketList.update({ _id: id },
          {
            $push: { items: data._id },
          }).exec((err, items) => {
          if (items.ok) {
            return res.status(201).json({
              message: 'Bucket item created successfuly',
              data,
            });
          }
        });
      }
    } catch (error) {
      const errorData = errorHandler(error, 'bucketItem');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response data
 * @memberof BucketItem class
 */
  static async modify(req, res) {
    try {
      const { item_id } = req.params;
      const data = await BucketItem.findOneAndUpdate(
        { _id: item_id },
        {
          ...req.body,
        },
        { new: true },
      );

      return res.status(200).json({
        message: 'Bucket items successfully updated',
        data,
      });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketItem');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {json} response
 * @memberof BucketItem
 */
  static async deleteBucketItem(req, res) {
    try {
      const { item_id } = req.params;
      await BucketItem.findOneAndDelete({ _id: item_id });
      return res.status(200).json({
        message: 'Bucket item successfully deleted',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketItem');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }
}

export default BucketItems;
