import BucketList from '../models/BucketList';

/** @class Search
 * @returns {object} static methods
 */
export default class Search {
  /**
     * @method sortByDate
   * @description - Fetch list of BucketLists ordered
   * (descending) by date
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @return {object} this - Class instance
   * @memberof Search
   */
  static async sortByDate(req, res) {
    const { query } = req;
    const { _id } = req.decoded;
    try {
      const limit = Number(query.limit) || 20,
        currentPage = Number(query.page) || 1,
        offset = (currentPage - 1) * limit;
      const data = await BucketList.find({ created_by: _id })
        .sort({ date: -1 })
        .skip(offset)
        .limit(limit);
      if (data.length) {
        return res.status(200).json({
          message: 'BucketList(s) found',
          data,
        });
      }
      throw new Error('Nothing found!');
    } catch (error) {
      const { message } = error;
      return res.status(404).json({
        message,
      });
    }
  }

  /**
   * @method sortByTitle
   * @description - Fetch list of BucketLists ordered
   * (descending) by title
   * @param {object} req - HTTP Request
   * @param {object} res - HTTP Response
   * @return {object} this - Class instance
   * @memberof Search
   */
  static async sortByName(req, res) {
    const { query } = req;
    const { _id } = req.decoded;
    try {
      const { q } = query,
        limit = Number(query.limit) || 20,
        currentPage = Number(query.page) || 1,
        offset = (currentPage - 1) * limit;

      const data = await BucketList.find({ name: q, created_by: _id })
        .skip(offset)
        .limit(limit);
      if (data.length) {
        return res.status(200).json({
          message: 'BucketList(s) found',
          data,
        });
      }

      throw new Error('Nothing found!');
    } catch (error) {
      const { message } = error;
      return res.status(404).json({
        message,
      });
    }
  }
}
