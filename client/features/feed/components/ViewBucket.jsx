/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import editBucketList from '../actionCreators/editBucketList';
import editBucketItem from '../actionCreators/editBucketItem';
import getBucketItems from '../actionCreators/getBucketItems';
import deleteBucketItem from '../actionCreators/deleteBucketItem';
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
  history,
  editBucket,
  editItem,
  bucketItems,
  fetchItems,
  deleteItem,
}) => {
  // const [inputData, setData] = useState('');
  useEffect(() => {
    fetchItems(history.location.pathname.split('/')[2]);
  }, [fetchItems, history.location.pathname]);

  const handleDeleteItem = async (itemId, listId) => {
    await deleteItem(itemId, listId);
    await fetchItems(history.location.pathname.split('/')[2]);
  };

  const handleEditItem = async (itemId, editedData, listId) => {
    await editItem(itemId, editedData, listId);
    await fetchItems(listId);
  };

  return (
    <div className="container py-5 px-0">
      <div className="column d-flex flex-column flex-md-column">
        <div className="col-12 border-right">
          <h3 className="text-capitalize text-white">
            {bucketItems.name && bucketItems.name.substring(0, 45)}
          </h3>
          <h4 className="mb-3 d-flex justify-content-between bucket-header">
            <span className="text-capitalize">
              {bucketItems.name}
              {' '}
            </span>
            <a
              href="/feed"
              className="editor-add"
            >
              <i className="fas fa-angle-double-left text-success" />
            </a>
          </h4>
          {bucketItems.name > 0 && (
            <BucketList
              title={bucketItems.name}
              content={bucketItems.name}
              handleEdit={editBucket}
              id={bucketItems._id}
              link={`/list/${bucketItems._id}`}
              fetchBucketItem={() => fetchItems(bucketItems._id)}
              key={bucketItems._id}
            />
          )
        }
        </div>
        <div className="col-12">
          <h1 className="mb-3 d-flex justify-content-between bucket-header">
            {bucketItems.items.length > 1 ? 'Items'
              : bucketItems.items.length === 0 ? 'No Item please click the plus button to add'
                : 'Item'}
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
              showFullContent
            />
          ))}
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
    editBucket: editBucketList,
    fetchItems: getBucketItems,
    editItem: editBucketItem,
    deleteItem: deleteBucketItem,
  })(BucketLists);

BucketLists.defaultProps = {
  bucketItems: { items: [] }
};

BucketLists.propTypes = {
  bucketItems: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(
        PropTypes.objectOf(
          PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.bool,
            PropTypes.arrayOf(PropTypes.string)
          ])
        )
      )
    ])
  ),
  deleteItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired,
  editBucket: PropTypes.func.isRequired,
  fetchItems: PropTypes.func.isRequired,
};
