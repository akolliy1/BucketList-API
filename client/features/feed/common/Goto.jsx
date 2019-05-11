import React from 'react';

const Goto = ({ fetchBucketItem, viewItemOnNextLine }) => (
  viewItemOnNextLine && (
    <i
      className="fas fa-angle-double-right editor-item ml-2"
      title="view on the next section"
      onKeyDown={() => {}}
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={fetchBucketItem}
    />
  )
);

export default Goto;
