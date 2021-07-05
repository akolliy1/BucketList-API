import React from 'react';

import PropTypes from 'prop-types';

const EditIcon = ({ setFocus, isFocus }) => (
  <i
    className="far fa-edit editor-item"
    onKeyDown={() => {}}
    role="button"
    aria-pressed="false"
    tabIndex="0"
    title="edit"
    onClick={() => setFocus(!isFocus)}
  />
);

export default EditIcon;


EditIcon.defaultProps = {
  setFocus: () => {},
  isFocus: false,
};

EditIcon.propTypes = {
  isFocus: PropTypes.bool,
  setFocus: PropTypes.func,
};
