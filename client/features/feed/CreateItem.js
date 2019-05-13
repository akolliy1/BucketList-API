import React, { useEffect, useState } from 'react';
import PrimaryNavbar from 'Components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBucketList from './actionCreators/fetchBucketList';
import SuggestionArea from './common/SuggestionArea';
import AddToBucket from './common/AddToBucket';
import createItem from './actionCreators/createItem';
import './index.scss';

const CreateItem = ({
  fetchBucket,
  history: { push },
  authenticated,
  message,
  bucketItems,
  createBucketItem,
}) => {
  const [created, setToCreated] = useState(false);
  useEffect(() => {
    if (!bucketItems._id) {
      fetchBucket();
    }
  });

  useEffect(() => {
    if (!authenticated) {
      push('/');
    }
  });

  const handleClick = (input) => {
    createBucketItem(bucketItems._id, input);
    setToCreated(true);
  };

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
        {!bucketItems._id && <SuggestionArea />}
        {created && (
        <div className="container">
          <h1 className="text-white">{message}</h1>
        </div>
        )}
        {bucketItems._id && (
        <AddToBucket
          createBucket={handleClick}
        />
        )
          }
      </div>
    </div>
  );
};

const mapStateToProps = ({
  fetchBucketListReducer: { data },
  authReducer: { status: { authenticated } },
  getBucketItemsReducer: { data: bucketItems },
  createItemReducer: { data: { message } },
}) => ({
  data,
  bucketItems,
  message,
  authenticated,
});

export default connect(mapStateToProps,
  {
    fetchBucket: fetchBucketList,
    createBucketItem: createItem
  })(CreateItem);

CreateItem.defaultProps = {
  bucketItems: { items: [] },
  message: '',
  authenticated: false,
};

CreateItem.propTypes = {
  message: PropTypes.string,
  authenticated: PropTypes.bool,
  createBucketItem: PropTypes.func.isRequired,
  fetchBucket: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  bucketItems: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.arrayOf(PropTypes.string)
          ])
        )
      ]))
    ])
  ),
};
