import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBucketList from '../actionCreators/fetchBucketList';
import editBucketList from '../actionCreators/editBucketList';
import editBucketItem from '../actionCreators/editBucketItem';
import getBucketItems from '../actionCreators/getBucketItems';
import BucketList from '../common/BucketList';

import './bucketlists.scss';

const ItemInfo = id => (
  !id && (
  <span
    className="custom__info"
  >
    Select a List on your left
  </span>
  )
);

const BucketLists = ({
  data,
  fetchBucket,
  editBucket,
  editItem,
  bucketItems,
  fetchItems,
}) => {
  useEffect(() => {
    console.log('bucketItems', bucketItems);
    fetchBucket();
  }, [bucketItems, fetchBucket]);
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
              fetchBucketItem={() => fetchItems(bucket._id)}
              key={bucket._id}
              viewItemOnNextLine
            />
          ))
        }
        </div>
        <div className="col">
          <h1 className="mb-3 px-3 d-flex justify-content-between bucket-header">
        Item
            {' '}
            {bucketItems._id
            && (
            <a
              href="/item/create"
              className="editor-add"
            >
              <i className="fas fa-plus" />
            </a>
            )
            }
            <ItemInfo id={bucketItems._id} />
          </h1>
          {bucketItems.items && bucketItems.items.map(bucket => (
            <BucketList
              title={bucket.name}
              content={bucket.name}
              handleEdit={editItem}
              id={bucket._id}
              listId={bucketItems._id}
              key={bucket._id}
              markAsDone={bucket.done}
              showRemark
            />
          ))
        }
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  fetchBucketListReducer: { data },
  getBucketItemsReducer: { data: bucketItems }
}) => ({
  data,
  bucketItems,
});

export default connect(mapStateToProps,
  {
    fetchBucket: fetchBucketList,
    editBucket: editBucketList,
    fetchItems: getBucketItems,
    editItem: editBucketItem
  })(BucketLists);

BucketLists.defaultProps = {
  data: [],
  bucketItems: { items: [] }
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
  editItem: PropTypes.func.isRequired,
  fetchBucket: PropTypes.func.isRequired,
  editBucket: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};
