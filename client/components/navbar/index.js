/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import signOut from 'Redux/signOut';
import AuthNavbar from './AuthNavbar';
import PrimaryNavbar from './PrimaryNavbar';

const IndexNav = ({
  signOutUser,
  authenticated
}) => (
  <Fragment>
    {authenticated && <AuthNavbar signOut={signOutUser} />}
    {!authenticated && <PrimaryNavbar />}
  </Fragment>
);

const mapStateToProps = ({
  authReducer: { status: { authenticated } }
}) => ({
  authenticated
});

export default connect(
  mapStateToProps,
  { signOutUser: signOut }
)(IndexNav);

IndexNav.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  signOutUser: PropTypes.func.isRequired,
};
