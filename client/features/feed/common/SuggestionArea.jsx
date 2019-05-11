import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Authentication from '../../home/common/Authentication';
import BucketList from './BucketList';
import data from '../../home/topList.json';

const SuggestionArea = ({ authenticated, createBucket }) => {
  const [inputData, setData] = useState('');
  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row p-5">
        <div className="col-12 col-md-7 pr-5 border-right">
          <h6 className="text-center text-white">Get started today</h6>
          {!authenticated && <Authentication />}
          {authenticated
          && data.map(bucket => (
            <BucketList
              title={bucket.title}
              key={bucket.title}
              link={bucket.link}
              content={bucket.content}
            />
          ))
        }
        </div>
        <div className="col-12 col-md-5 mt-5 mt-md-0">
          <textarea
            name="bucketList"
            className="text-area col-12 bucket-list animate-height-effect" // eslint-disable-line
            placeholder="Add text..."
            onChange={e => setData(e.target.value)}
            onFocus={() => {}}
            maxLength="200"
          />
          <button
            className="btn btn-success btn-lg btn-block text-white"
            type="button"
            onClick={() => (inputData.length > 3 ? createBucket({ name: inputData }) : null)}
          >
        Create bucket
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  authReducer: { status: { authenticated } }
}) => ({
  authenticated
});


export default connect(
  mapStateToProps,
)(SuggestionArea);

SuggestionArea.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  createBucket: PropTypes.func.isRequired,
};
