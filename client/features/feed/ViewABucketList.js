import React from 'react';
import PrimaryNavbar from 'Components/navbar';
import BucketLists from './components/BucketLists';

import './index.scss';

const ViewABucketList = props => (
  <div className="view-bucket-list">
    <PrimaryNavbar />
    <div className="feed-bg" style={{ backgroundImage: 'url(http://2.bp.blogspot.com/-WSKIPpZC-LE/Tl_dSjVKrlI/AAAAAAAABC8/F_-wnMSP85Y/s1600/the%2Bbest%2Bcar%2Bin%2Bthe%2Bworld-3.jpg)' }}> {/* eslint-disable-line */}
      <BucketLists {...props} />
    </div>
  </div>
);

export default ViewABucketList;
