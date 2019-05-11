import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './bucketlist.scss';

const BucketList = ({
  name,
  title,
  link,
  content,
  addIcon,
  handleEdit,
  id,
}) => {
  const string = title;
  const length = 45;
  const trimmedString = string.substring(0, length);
  const [isFocus, setFocus] = useState(false);
  const [inputData, setData] = useState(false);
  return (
    <div className="col-12 mb-1">
      <a href={link} className="editor-content">
        <div className="card card-body">
          {trimmedString}
        </div>
      </a>
      <div className="editor">
        <i
          className="far fa-edit editor-item"
          onKeyDown={() => {}}
          role="button"
          aria-pressed="false"
          tabIndex="0"
          title="edit"
          onClick={() => setFocus(!isFocus)}
        />
        {addIcon && (
        <i
          className="fas fa-plus editor-item ml-2"
          title="add it to your bucket list"
        />
        )}
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
            onClick={() => handleEdit(id, { name: inputData })}
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
  handleEdit: () => {},
  id: '',
};

BucketList.propTypes = {
  title: PropTypes.string,
  link: PropTypes.string,
  name: PropTypes.string,
  content: PropTypes.string,
  id: PropTypes.string,
  addIcon: PropTypes.bool,
  handleEdit: PropTypes.func,
};
