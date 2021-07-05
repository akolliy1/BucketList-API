import errorHandler from '../helpers/errorHandler';
import BucketList from '../models/BucketList';
import searchBucketList from '../helpers/searchBucketList';

/**
 *
 * @class bucketList
 * @returns {object} static methods
 */
class BucketLists {
/**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response data
 * @memberof BucketList class
 */
  static async createBucketList(req, res) {
    try {
      const { _id } = req.decoded;
      const data = await BucketList.create({
        ...req.body, created_by: _id,
      });
      return res.status(201).json({
        message: 'Great BucketLists',
        data,
      });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketList');
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
 * @memberof BucketList class
 */
  static async modify(req, res) {
    try {
      const { id } = req.params;
      const data = await BucketList.findOneAndUpdate(
        { _id: id, created_by: req.decoded._id, },
        {
          ...req.body,
          isDeleted: false,
        },
        { new: true },
      );

      return res.status(200).json({
        message: 'Bucket Lists successfully updated',
        data,
      });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketList');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
   *
   *
   * @static
   * @param {object} { params: { slug } }
   * @param {object} res
   * @returns {json} response
   * @memberof BucketList
   */
  static async getBucketList({ params: { id } }, res) {
    try {
      await BucketList.findOne({ _id: id })
        .populate('items')
        .exec((err, data) => {
          if (data) {
            return res.status(200).json({
              message: 'Bucket List successfully fetched',
              data,
            });
          }
          return res.status(404).json({
            message: 'Bucket List not found',
          });
        });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketList');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }

  /**
 *
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {json} response
 * @memberof BucketList
 */
  static async getAllBucketList(req, res) {
    const { sortByDate, sortByName } = searchBucketList;
    const { query } = req;
    if (query.q) {
      await sortByName(req, res);
    } else {
      sortByDate(req, res);
    }
  }

  /**
 *
 * @static
 * @param {object} req
 * @param {object} res
 * @returns {json} response
 * @memberof BucketList
 */
  static async deleteBucketList(req, res) {
    try {
      const { id } = req.params;
      await BucketList.findOneAndDelete({ _id: id, created_by: req.decoded._id, });
      return res.status(200).json({
        message: 'Bucket List successfully deleted',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'bucketList');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }
}

export default BucketLists;
