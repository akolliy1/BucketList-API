import React from 'react';
import PrimaryNavbar from 'Components/navbar';
import BucketLists from './components/ViewBucket';

import './index.scss';

const ViewABucketList = props => (
  <div className="view-bucket-list">
    <PrimaryNavbar />
    <div className="feed-bg" style={{ backgroundImage: 'url(data:image/jpeg;base64,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)' }}> {/* eslint-disable-line */}
      <BucketLists {...props} />
    </div>
  </div>
);

export default ViewABucketList;
