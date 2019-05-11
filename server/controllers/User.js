import bcrypt from 'bcrypt';

import user from '../models/User';
import errorHandler from '../helpers/errorHandler';
import createToken from '../helpers/createToken';

/**
 *
 * @class User
 * @returns {object} static methods
 */
class User {
  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response data
 * @memberof User class
 */
  static async signInOrUp(req, res) {
    try {
      const { email, password } = req.body;
      const registeredUser = await user.findOne({ email });
      if (registeredUser) {
        const validPassword = bcrypt
          .compareSync(password, registeredUser.password);
        if (validPassword) {
          return res.status(200).json({
            message: 'successfuly signin',
            token: createToken(registeredUser),
          });
        }
        return res.status(400).json({
          message: 'Incorrect email or password',
        });
      }
      // Create user
      const hash = await bcrypt.hash(password, 10);
      const createUser = await user.create({
        ...req.body, password: hash,
      });
      return res.status(201).json({
        message: 'User created',
        token: createToken(createUser),
      });
    } catch (error) {
      return res.status(500).json({ message: 'An error occur' });
    }
  }


  /**
 *
 * @param {object} req
 * @param {object} res
 * @returns {object} response data
 * @memberof User class
 */
  static async signOut(req, res) {
    try {
      const { slug } = req.decoded;
      const userDetails = await user.findBySlug(slug);
      if (userDetails) {
        return res.status(200).json({
          message: 'You\'ve logout successfully',
          token: null,
        });
      }
      return res.status(404).json({
        message: 'You do not seem to be registered, please sign up or try again',
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
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
* @memberof User class
*/
  static async modifyUser(req, res) {
    try {
      const { id } = req.decoded;
      if (req.body.password) {
        const { password } = req.body;
        req.body.password = bcrypt.hashSync(password, 10);
      }
      await user.init();
      const updatedUser = await user
        .findOneAndUpdate({ _id: id }, {
          ...req.body,
        }, { new: true });

      const {
        firstName, lastName, email, imageUrl,
      } = updatedUser;
      return res.status(200).json({
        message: 'User edited successfully',
        updatedUser: {
          firstName, lastName, email, imageUrl,
        },
      });
    } catch (error) {
      const errorData = errorHandler(error, 'user');
      const { statusCode, message } = errorData;
      return res.status(statusCode).json({
        message,
      });
    }
  }
}

export default User;
