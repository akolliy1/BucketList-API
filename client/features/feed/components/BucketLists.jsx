import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBucketList from '../actionCreators/fetchBucketList';
import editBucketList from '../actionCreators/editBucketList';
import deleteBucketList from '../actionCreators/deleteBucketList';
import deleteBucketItem from '../actionCreators/deleteBucketItem';
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
  deleteItem,
  deleteList
}) => {
  const [bucketListId, setBucketListId] = useState('');
  useEffect(() => {
    fetchBucket();
  }, [bucketItems, fetchBucket]);

  const handleEditItem = async (itemId, editedData, listId) => {
    await editItem(itemId, editedData, listId);
    await fetchItems(bucketListId);
  };
  const handlefetchItems = async (listId) => {
    setBucketListId(listId);
    await fetchItems(listId);
  };

  const handleDeleteItem = async (itemId, listId) => {
    await deleteItem(itemId, listId);
    await fetchItems(listId);
  };

  const handleDeleteList = async (listId) => {
    await deleteList(listId);
    await fetchBucket();
  };

  return (
    <div className="container py-5 px-0">
      <div className="d-flex flex-column flex-md-row">
        <div className="col-12 col-md-6 border-right">
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
              link={`/list/${bucket._id}`}
              fetchBucketItem={() => handlefetchItems(bucket._id)}
              key={bucket._id}
              handleDelete={() => handleDeleteList(bucket._id)}
              showDelete
              viewItemOnNextLine
            />
          ))
        }
        </div>
        <div className="col-12 col-md-6">
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
              handleEdit={handleEditItem}
              id={bucket._id}
              listId={bucketItems._id}
              key={bucket._id}
              markAsDone={bucket.done}
              handleDelete={() => handleDeleteItem(bucket._id, bucketItems._id,)}
              showRemark
              showDelete
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
    editItem: editBucketItem,
    deleteItem: deleteBucketItem,
    deleteList: deleteBucketList,
  })(BucketLists);

BucketLists.defaultProps = {
  data: [],
  bucketItems: { items: [] }
};

BucketLists.propTypes = {
  deleteItem: PropTypes.func.isRequired,
  deleteList: PropTypes.func.isRequired,
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
