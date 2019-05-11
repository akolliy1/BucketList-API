import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Goto from './Goto';
import Remark from './Remark';
import EditIcon from './EditIcon';
import './bucketlist.scss';

const BucketList = ({
  name,
  title,
  link,
  content,
  addIcon,
  viewItemOnNextLine,
  showRemark,
  handleEdit,
  fetchBucketItem,
  id,
  listId,
  markAsDone,
}) => {
  const string = title;
  const length = 45;
  const trimmedString = string.substring(0, length);
  const [isFocus, setFocus] = useState(false);
  const [inputData, setData] = useState('');

  const handleClick = () => {
    if (inputData.length >= 3) {
      setFocus(false);
      const editedData = { name: inputData };
      handleEdit(id, editedData, listId);
    }
  };

  const handleDone = () => {
    setFocus(false);
    const doneData = {
      name: content,
      done: !markAsDone
    };

    handleEdit(id, doneData, listId);
  };

  return (
    <div className="col-12 mb-1">
      <a href={link} className="editor-content">
        <div className="card card-body">
          {trimmedString}
        </div>
      </a>
      <div className="editor">
        <EditIcon
          isFocus={isFocus}
          setFocus={setFocus}
        />
        {addIcon && (
        <i
          className="fas fa-plus editor-item ml-2"
          title="add it to your bucket list"
        />
        )}
        <Goto
          fetchBucketItem={fetchBucketItem}
          viewItemOnNextLine={viewItemOnNextLine}
        />
        <Remark
          markAsDone={markAsDone}
          handleDone={handleDone}
          showRemark={showRemark}
        />
      </div>
      {isFocus && (
        <div>
          <textarea
            name={name}
            className="text-area col-12 bucket-list animate-height-effect" // min-height: 90px;
            placeholder="Add text..."
            defaultValue={content || ''}
            onChange={e => setData(e.target.value)}
            onFocus={() => {}}
            maxLength="200"
          />
          <i
            className="fas fa-paper-plane send-edit-icon"
            onKeyDown={() => {}}
            role="button"
            aria-pressed="false"
            tabIndex="0"
            title="edit"
            onClick={() => handleClick()}
          />
        </div>
      )}
    </div>
  );
};

export default BucketList;

BucketList.defaultProps = {
  title: `Family Bucket List: 65 Fun Activities &
  the Best Things to Do with Kids`,
  link: '/',
  name: 'bucket',
  content: `Family Bucket List: 65 Fun Activities &
  the Best Things to Do with Kids`,
  addIcon: false,
  viewItemOnNextLine: false,
  handleEdit: () => {},
  id: '',
  listId: '',
  showRemark: false,
  markAsDone: false,
};

BucketList.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  listId: PropTypes.string,
  addIcon: PropTypes.bool,
  markAsDone: PropTypes.bool,
  showRemark: PropTypes.bool,
  viewItemOnNextLine: PropTypes.bool,
  handleEdit: PropTypes.func,
  fetchBucketItem: PropTypes.func.isRequired,
};
