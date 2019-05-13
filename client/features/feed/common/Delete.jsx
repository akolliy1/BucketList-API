import React from 'react';

const Delete = ({ showDelete, handleDelete }) => (
  showDelete && (
    <i
      className="far fa-times-circle editor-item ml-2"
      title="delete this"
      onKeyDown={() => {}}
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={() => handleDelete()}
    />
  )
);

export default Delete;
