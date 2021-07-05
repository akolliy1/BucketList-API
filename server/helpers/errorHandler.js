import errorMessages from './errorMessages';

/**
 *
 * @param {object} error
 * @param {string} type
 * @returns {string} error message
 */
const errorHandler = (error, type) => {
  switch (error.code) {
    case 11000: {
      return {
        message: errorMessages[11000][type],
        statusCode: 409,
      };
    }
    default: {
      return {
        message: 'An error occurred',
        statusCode: 500,
      };
    }
  }
};

export default errorHandler;
