import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Authentication from '../common/Authentication';
import SimpleIntro from '../common/SimpleIntro';
import BucketList from '../../feed/common/BucketList';
import data from '../topList.json';

const SuggestionArea = ({ authenticated }) => (
  <div className="container my-5">
    <div className="d-flex flex-column flex-md-row bg-success p-5">
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
        <SimpleIntro />
      </div>
    </div>
  </div>
);


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
};
