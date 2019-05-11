import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBucketList from '../actionCreators/fetchBucketList';
import editBucketList from '../actionCreators/editBucketList';
import BucketList from '../common/BucketList';

import './bucketlists.scss';

const BucketLists = ({ data, fetchBucket, editBucket }) => {
  useEffect(() => {
    fetchBucket();
  }, [fetchBucket]);
  return (
    <div className="container py-5 px-0">
      <div className="d-flex flex-column flex-md-row">
        <div className="col border-right">
          <h1 className="mb-3 px-3 d-flex justify-content-between bucket-header">
            <span>Lists </span>
            {' '}
            <a
              href="/bucketList/create"
              className="editor-add"
            >
              <i className="fas fa-plus" />
            </a>
          </h1>
          {data.length > 0 && data.map(bucket => (
            <BucketList
              title={bucket.name}
              content={bucket.name}
              handleEdit={editBucket}
              id={bucket._id}
              viewItemOnNextLine
            />
          ))
        }
        </div>
        <div className="col">
          <h1 className="mb-3 px-3 d-flex justify-content-between bucket-header">
        Item
            {' '}
            <a
              href="/item/create"
              className="editor-add"
            >
              <i className="fas fa-plus" />
            </a>
          </h1>
          <BucketList />
          <BucketList />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  fetchBucketListReducer: { data }
}) => ({
  data,
});

export default connect(mapStateToProps,
  {
    fetchBucket: fetchBucketList,
    editBucket: editBucketList
  })(BucketLists);

BucketLists.defaultProps = {
  data: []
};

BucketLists.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.string)
      ])
    )
  ),
  fetchBucket: PropTypes.func.isRequired,
  editBucket: PropTypes.func.isRequired,
};
