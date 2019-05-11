import React, { Fragment } from 'react';
import PrimaryNavbar from 'Components/navbar';
import BucketLists from './components/BucketLists';

const Feed = props => (
  <Fragment>
    <PrimaryNavbar />
    <BucketLists {...props} />
  </Fragment>
);

export default Feed;
