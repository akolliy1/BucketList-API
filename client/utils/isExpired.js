import jwt from 'jsonwebtoken';

/**
 * @function isExpired
 * @returns {boolean} boolean
 */
function isExpired() {
  const token = localStorage.getItem('x-access-token');
  const { SECRET } = process.env;
  try {
    const decoded = jwt.verify(token, SECRET).data;
    if (decoded) return false;
  } catch (err) {
    return true;
  }
  return true;
}

export default isExpired;
