import React, { useEffect } from 'react';
import PrimaryNavbar from 'Components/navbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchBucketList from './actionCreators/fetchBucketList';
import SuggestionArea from './common/SuggestionArea';
import './index.scss';

const CreateItem = ({ fetchBucket }) => {
  useEffect(() => {
    fetchBucket();
  });

  return (
    <div className="create-bucket-list">
      <PrimaryNavbar />
      <div
        className="feed-bg"
        style={
          {
            backgroundImage:
            'url(http://2.bp.blogspot.com/-WSKIPpZC-LE/Tl_dSjVKrlI/AAAAAAAABC8/F_-wnMSP85Y/s1600/the%2Bbest%2Bcar%2Bin%2Bthe%2Bworld-3.jpg)' // eslint-disable-line
          }}
      >
        <SuggestionArea />
      </div>
    </div>
  );
};

export default connect(null, { fetchBucket: fetchBucketList })(CreateItem);

CreateItem.propTypes = {
  fetchBucket: PropTypes.func.isRequired
};
