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
  data, // eslint-disable-line
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
            'url(http://2.bp.blogspot.com/-WSKIPpZC-LE/Tl_dSjVKrlI/AAAAAAAABC8/F_-wnMSP85Y/s1600/the%2Bbest%2Bcar%2Bin%2Bthe%2Bworld-3.jpg)' // eslint-disable-line
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
  data: [],
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
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.string)
      ])
    )
  ),
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
