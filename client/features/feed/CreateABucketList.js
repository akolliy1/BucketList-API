import React, { useState } from 'react';
import PrimaryNavbar from 'Components/navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createBucketList from './actionCreators/createBucketList';
import './index.scss';

const CreateABucketList = ({ createBucket }) => {
  const [inputData, setData] = useState('');
  return (
    <div className="create-bucket-list">
      <PrimaryNavbar />
      <div
        className="feed-bg"
        style={
          {
            backgroundImage:
            'url(http://2.bp.blogspot.com/-WSKIPpZC-LE/Tl_dSjVKrlI/AAAAAAAABC8/F_-wnMSP85Y/s1600/the%2Bbest%2Bcar%2Bin%2Bthe%2Bworld-3.jpg)' // eslint-disable-line
          }}
      >
        <div className="container pb-5">
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
            onClick={() => (inputData.length > 3 ? createBucket({ name: inputData }) : null)} // eslint-disable-line
          >
        Create bucket
          </button>
        </div>
      </div>
    </div>
  );
};

export default
connect(null, { createBucket: createBucketList })(CreateABucketList);

CreateABucketList.propTypes = {
  createBucket: PropTypes.func.isRequired
};
