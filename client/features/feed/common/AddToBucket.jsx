import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddToBucket = ({ createBucket }) => {
  const [inputData, setData] = useState('');
  return (
    <div className="container">
      <div className="col-12 col-md-5 mt-5 mt-md-0">
        <textarea
          name="bucketList"
          className="text-area col-12 bucket-list animate-height-effect" // eslint-disable-line
          placeholder="Add text..."
          onChange={e => setData(e.target.value)}
          onFocus={() => {}}
          maxLength="200"
        />
        <button
          className="btn btn-success btn-lg btn-block text-white"
          type="button"
          onClick={() => (inputData.length > 3 ? createBucket({ name: inputData }) : null)}
        >
        Create bucket
        </button>
      </div>
    </div>
  );
};

AddToBucket.propTypes = {
  createBucket: PropTypes.func.isRequired,
};

export default AddToBucket;
