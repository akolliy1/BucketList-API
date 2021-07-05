import React, { useState, useEffect } from 'react';
import PrimaryNavbar from 'Components/navbar';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createBucketList from './actionCreators/createBucketList';
import './index.scss';

const CreateABucketList = ({
  createBucket,
  authenticated,
  message,
  history: { push }
}) => {
  const [inputData, setData] = useState('');
  const [created, setToCreated] = useState(false);

  const handleClick = () => {
    createBucket({ name: inputData });
    setToCreated(true);
  };

  useEffect(() => {
    if (!authenticated) {
      push('/');
    }
  });

  return (
    <div className="create-bucket-list">
      <PrimaryNavbar />
      <div
        className="feed-bg"
        style={
          {
            backgroundImage:
            'url(data:image/jpeg;base64,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)' // eslint-disable-line
          }}
      >
        {created && (
        <div className="container">
          <h1 className="text-white">{message}</h1>
        </div>
        )}
        <div className="container pb-5">
          <textarea
            name="bucketList"
            className="text-area col-12 bucket-list animate-height-effect" // eslint-disable-line
            placeholder="Add text..."
            onChange={e => setData(e.target.value)}
            onFocus={() => {}}
          />
          <button
            className="btn btn-success btn-lg btn-block text-white"
            type="button"
            onClick={() => (inputData.length > 3 ? handleClick() : null)} // eslint-disable-line
          >
        Create bucket
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  authReducer: { status: { authenticated } },
  createBucketListReducer: { data: { message } },
}) => ({
  message,
  authenticated,
});

export default
connect(mapStateToProps, { createBucket: createBucketList })(CreateABucketList);

CreateABucketList.defaultProps = {
  message: '',
  authenticated: false,
};

CreateABucketList.propTypes = {
  message: PropTypes.string,
  authenticated: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  createBucket: PropTypes.func.isRequired
};
