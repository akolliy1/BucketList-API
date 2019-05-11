import React from 'react';

const Remark = ({ showRemark, handleDone, markAsDone }) => (
  showRemark && (
    <i
      className={`fas fa-check editor-item ml-2
    ${markAsDone ? '' : 'text-primary'}`}
      title={`${markAsDone ? 'Done' : 'mark as done'}`}
      onKeyDown={() => {}}
      role="button"
      aria-pressed="false"
      tabIndex="0"
      onClick={() => handleDone()}
    />
  )
);

export default Remark;
